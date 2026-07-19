'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/shared/hooks/useAuth';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { isCloudinaryConfigured, uploadToCloudinary } from '@/shared/services/cloudinary.service';
import { questionService } from '@/modules/questions/services/question.service';
import { aiService } from '../services/ai.service';
import { AiConversationListItem, AiMessage } from '../types/ai';

interface UseAiTutorChatOptions {
  questionId?: string | null;
  initialConversationId?: string | null;
  newChatKey?: string | null;
  /** Nếu đã có title từ parent thì khỏi fetch lại */
  initialQuestionTitle?: string | null;
  enabled?: boolean;
}

const truncateTitle = (title: string, max = 48) => {
  const trimmed = title.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}...`;
};

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const useAiTutorChat = ({
  questionId = null,
  initialConversationId = null,
  newChatKey = null,
  initialQuestionTitle = null,
  enabled = true,
}: UseAiTutorChatOptions) => {
  const t = useTranslations('ai.chat');
  const tError = useTranslations('api_errors');
  const { ready, isAuthenticated } = useAuth();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [questionTitle, setQuestionTitle] = useState<string | null>(initialQuestionTitle);
  const [draft, setDraft] = useState('');
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<AiConversationListItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bootstrappedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialQuestionTitle) {
      setQuestionTitle(initialQuestionTitle);
    }
  }, [initialQuestionTitle]);

  const loadHistory = useCallback(async () => {
    if (!enabled || !ready || !isAuthenticated) {
      return;
    }

    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const page = await aiService.listConversations(1, 50);
      setHistoryItems(page.items);
    } catch (err) {
      setHistoryError(resolveApiErrorMessage(err, tError, t('history_load_error')));
    } finally {
      setHistoryLoading(false);
    }
  }, [enabled, ready, isAuthenticated, t, tError]);

  const bootstrap = useCallback(async () => {
    if (!enabled || !ready || !isAuthenticated) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const conversationPromise = initialConversationId
        ? aiService.getConversation(initialConversationId)
        : aiService.createOrResumeConversation({
            mode: 'tutor',
            question_id: questionId || null,
          });

      const titlePromise =
        questionId && !initialQuestionTitle
          ? questionService
              .getById(questionId)
              .then((q) => q.title)
              .catch(() => null)
          : Promise.resolve(initialQuestionTitle);

      const [conversation, title] = await Promise.all([conversationPromise, titlePromise]);

      setConversationId(conversation.id);
      setMessages(conversation.messages ?? []);
      setQuestionTitle(title ?? null);
      setDraft('');
      setPendingImages([]);
    } catch (err) {
      setError(resolveApiErrorMessage(err, tError, t('load_error')));
    } finally {
      setLoading(false);
    }
  }, [
    enabled,
    ready,
    isAuthenticated,
    questionId,
    initialConversationId,
    initialQuestionTitle,
    t,
    tError,
  ]);

  useEffect(() => {
    if (!enabled || !ready || !isAuthenticated) {
      return;
    }

    const key = `${questionId ?? 'none'}:${initialConversationId ?? 'new'}:${
      newChatKey ?? 'default'
    }`;
    if (bootstrappedKeyRef.current === key) {
      return;
    }
    bootstrappedKeyRef.current = key;
    void bootstrap();
  }, [enabled, ready, isAuthenticated, questionId, initialConversationId, newChatKey, bootstrap]);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if ((!trimmed && pendingImages.length === 0) || !conversationId || sending) {
      return;
    }

    const messageContent = trimmed || t('image_default_prompt');
    const messageImages = [...pendingImages];
    setSending(true);
    setError(null);
    setDraft('');
    setPendingImages([]);
    setImageError(null);

    const optimisticId = `temp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        conversation_id: conversationId,
        role: 'user',
        content: messageContent,
        images: messageImages,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      const result = await aiService.sendMessage(conversationId, {
        content: messageContent,
        images: messageImages,
      });
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticId),
        result.user_message,
        result.assistant_message,
      ]);
      void loadHistory();
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setDraft(trimmed);
      setPendingImages(messageImages);
      setError(resolveApiErrorMessage(err, tError, t('send_error')));
    } finally {
      setSending(false);
    }
  };

  const uploadImage = async (file: File) => {
    if (pendingImages.length >= MAX_IMAGES) {
      setImageError(t('images_max', { max: MAX_IMAGES }));
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError(t('image_type_invalid'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError(t('image_too_large'));
      return;
    }
    if (!isCloudinaryConfigured()) {
      setImageError(t('cloudinary_not_configured'));
      return;
    }

    setImageUploading(true);
    setImageError(null);
    try {
      const url = await uploadToCloudinary(file, 'ai-chat');
      setPendingImages((prev) => [...prev, url].slice(0, MAX_IMAGES));
    } catch {
      setImageError(t('image_upload_failed'));
    } finally {
      setImageUploading(false);
    }
  };

  const removePendingImage = (index: number) => {
    setPendingImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
    setImageError(null);
  };

  const welcomeText = questionId ? t('welcome_with_question') : t('welcome');
  const contextBanner = questionTitle
    ? t('context_banner', { title: truncateTitle(questionTitle) })
    : t('context_banner_fallback');

  return {
    t,
    ready,
    isAuthenticated,
    conversationId,
    messages,
    questionId,
    questionTitle,
    draft,
    setDraft,
    pendingImages,
    imageUploading,
    imageError,
    maxImages: MAX_IMAGES,
    historyItems,
    historyLoading,
    historyError,
    reloadHistory: loadHistory,
    loading,
    sending,
    error,
    bottomRef,
    welcomeText,
    contextBanner,
    sendMessage,
    uploadImage,
    removePendingImage,
    reload: bootstrap,
  };
};
