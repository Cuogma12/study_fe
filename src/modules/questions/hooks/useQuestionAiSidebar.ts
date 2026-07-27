'use client';

import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAiTutorChat } from '@/modules/ai/hooks/useAiTutorChat';

interface UseQuestionAiSidebarOptions {
  questionId: string;
  questionTitle?: string | null;
}

export const useQuestionAiSidebar = ({
  questionId,
  questionTitle = null,
}: UseQuestionAiSidebarOptions) => {
  const t = useTranslations('question_detail.ai');
  const tChat = useTranslations('ai.chat');
  const { navigateTo, navigateToLogin } = useAppNavigation();
  const { ready, isAuthenticated } = useAuth();

  const chat = useAiTutorChat({
    questionId,
    initialQuestionTitle: questionTitle,
    enabled: ready && isAuthenticated,
  });

  const openFullscreen = () => {
    if (!isAuthenticated) {
      navigateToLogin();
      return;
    }
    navigateTo(`/ai?mode=tutor&question_id=${questionId}`);
  };

  const goLogin = () => navigateToLogin();

  return {
    t,
    tChat,
    ready,
    isAuthenticated,
    openFullscreen,
    goLogin,
    conversationId: chat.conversationId,
    messages: chat.messages,
    draft: chat.draft,
    setDraft: chat.setDraft,
    pendingImages: chat.pendingImages,
    imageUploading: chat.imageUploading,
    imageError: chat.imageError,
    maxImages: chat.maxImages,
    loading: chat.loading,
    sending: chat.sending,
    error: chat.error,
    bottomRef: chat.bottomRef,
    welcomeText: chat.welcomeText,
    sendMessage: chat.sendMessage,
    uploadImage: chat.uploadImage,
    removePendingImage: chat.removePendingImage,
  };
};
