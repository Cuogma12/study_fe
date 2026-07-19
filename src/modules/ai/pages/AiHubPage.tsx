'use client';

import { Suspense } from 'react';
import { Button, Text } from '@/shared/components/atoms';
import { useAiHubPage } from '../hooks/useAiHubPage';
import { AiHubView } from '../components/organisms/AiHubView';
import { AiTutorChat } from '../components/organisms/AiTutorChat';

const AiHubPageInner = () => {
  const {
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
  } = useAiHubPage();

  if (!ready) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-slate-500">
          {t('title')}
        </Text>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16">
        <Text variant="body2" className="!text-slate-600">
          {t('login_required')}
        </Text>
        <Button onClick={goLogin}>{t('login_action')}</Button>
      </main>
    );
  }

  if (isTutorMode) {
    return (
      <main className="w-full">
        <AiTutorChat
          questionId={questionId}
          initialConversationId={conversationId}
          newChatKey={newChatKey}
        />
      </main>
    );
  }

  return (
    <AiHubView
      title={t('title')}
      subtitle={t('subtitle')}
      activeBadge={t('active_badge')}
      startAction={t('start_action')}
      comingSoon={t('coming_soon')}
      unavailable={t('unavailable')}
      tutorTitle={t('modes.tutor.title')}
      tutorDescription={t('modes.tutor.description')}
      explainTitle={t('modes.explain_quiz.title')}
      explainDescription={t('modes.explain_quiz.description')}
      generateTitle={t('modes.generate_quiz.title')}
      generateDescription={t('modes.generate_quiz.description')}
      techTitle={t('teasers.tech_title')}
      techDescription={t('teasers.tech_description')}
      personalTitle={t('teasers.personal_title')}
      personalDescription={t('teasers.personal_description')}
      stats={hubStats}
      onStartTutor={startTutor}
      onStartGenerateQuiz={startGenerateQuiz}
    />
  );
};

export const AiHubPage = () => {
  return (
    <Suspense fallback={null}>
      <AiHubPageInner />
    </Suspense>
  );
};
