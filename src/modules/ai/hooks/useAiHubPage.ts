'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

export const useAiHubPage = () => {
  const t = useTranslations('ai.hub');
  const { ready, isAuthenticated } = useAuth();
  const { navigateTo } = useAppNavigation();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode');
  const questionId = searchParams.get('question_id');
  const conversationId = searchParams.get('conversation_id');
  const newChatKey = searchParams.get('new');
  const isTutorMode = mode === 'tutor';

  const startTutor = () => navigateTo('/ai?mode=tutor');
  const startGenerateQuiz = () => navigateTo('/quiz/new');
  const goLogin = () => navigateTo('/login');

  const hubStats = [
    {
      value: t('stats.questions_value'),
      label: t('stats.questions_label'),
    },
    {
      value: t('stats.satisfaction_value'),
      label: t('stats.satisfaction_label'),
    },
    {
      value: t('stats.support_value'),
      label: t('stats.support_label'),
    },
    {
      value: t('stats.subjects_value'),
      label: t('stats.subjects_label'),
    },
  ];

  return {
    t,
    ready,
    isAuthenticated,
    isTutorMode,
    questionId,
    conversationId,
    newChatKey,
    hubStats,
    startTutor,
    startGenerateQuiz,
    goLogin,
  };
};
