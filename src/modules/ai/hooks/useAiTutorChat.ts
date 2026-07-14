'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/shared/hooks/useAuth';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { questionService } from '@/modules/questions/services/question.service';
import { aiService } from '../services/ai.service';
import { AiMessage } from '../types/ai';

interface UseAiTutorChatOptions {
  questionId?: string | null;
  /** Nếu đã có title từ parent thì khỏi fetch lại */
  initialQuestionTitle?: string | null;
  enabled?: boolean;
}

const truncateTitle = (title: string, max = 48) => {
  const trimmed = title.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}...`;
};

export const useAiTutorChat = ({
  questionId = null,
  initialQuestionTitle = null,
  enabled = true,
}: UseAiTutorChatOptions) => {
  const t = useTranslations('ai.chat');
  const tError = useTranslations('api_errors');
  const { ready, isAuthenticated } = useAuth();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [questionTitle, setQuestionTitle] = useState<string | null>(
    initialQuestionTitle
  );
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bootstrappedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialQuestionTitle) {
      setQuestionTitle(initialQuestionTitle);
    }
  }, [initialQuestionTitle]);

  const bootstrap = useCallback(async () => {
    if (!enabled || !ready || !isAuthenticated) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const conversationPromise = aiService.createOrResumeConversation({
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

      const [conversation, title] = await Promise.all([
        conversationPromise,
        titlePromise,
      ]);

      setConversationId(conversation.id);
      setMessages(conversation.messages ?? []);
      if (title) {
        setQuestionTitle(title);
      }
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
    initialQuestionTitle,
    t,
    tError,
  ]);

  useEffect(() => {
    if (!enabled || !ready || !isAuthenticated) {
      return;
    }

    const key = `${questionId ?? 'none'}`;
    if (bootstrappedKeyRef.current === key) {
      return;
    }
    bootstrappedKeyRef.current = key;
    void bootstrap();
  }, [enabled, ready, isAuthenticated, questionId, bootstrap]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || !conversationId || sending) {
      return;
    }

    setSending(true);
    setError(null);
    setDraft('');

    const optimisticId = `temp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        conversation_id: conversationId,
        role: 'user',
        content: trimmed,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      const result = await aiService.sendMessage(conversationId, trimmed);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticId),
        result.user_message,
        result.assistant_message,
      ]);
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setDraft(trimmed);
      setError(resolveApiErrorMessage(err, tError, t('send_error')));
    } finally {
      setSending(false);
    }
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
    loading,
    sending,
    error,
    bottomRef,
    welcomeText,
    contextBanner,
    sendMessage,
    reload: bootstrap,
  };
};
