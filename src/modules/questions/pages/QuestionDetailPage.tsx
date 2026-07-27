'use client';

import React from 'react';
import { Text, Button } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { useQuestionDetail } from '../hooks/useQuestionDetail';
import { QuestionBreadcrumb } from '../components/organisms/QuestionBreadcrumb';
import { QuestionDetailCard } from '../components/organisms/QuestionDetailCard';
import { AnswersSection } from '../components/organisms/AnswersSection';
import { QuestionAiSidebar } from '../components/organisms/QuestionAiSidebar';

interface QuestionDetailPageProps {
  questionId: string;
}

export const QuestionDetailPage = ({ questionId }: QuestionDetailPageProps) => {
  const t = useTranslations('question_detail');
  const { navigateTo, navigateToLogin } = useAppNavigation();
  const { isAuthenticated, userId } = useAuth();
  const {
    question,
    loading,
    error,
    actionLoading,
    toggleSave,
    closeDiscussion,
    deleteQuestion,
    submitAnswer,
    submitReply,
    loadReplies,
  } = useQuestionDetail(questionId);

  const handleDelete = async () => {
    try {
      await deleteQuestion();
      navigateTo('/');
    } catch {
      window.alert(t('delete_failed'));
    }
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigateToLogin();
      return false;
    }
    return true;
  };

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  if (error || !question) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16">
        <Text variant="body2" className="!text-red-500">
          {t('load_error')}
        </Text>
        <Button variant="outline" size="sm" onClick={() => navigateTo('/')}>
          {t('back_home')}
        </Button>
      </main>
    );
  }

  const isOwner = Boolean(userId && question.author?.id === userId);

  return (
    <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
      <div className="min-w-0 flex-1 space-y-5">
        <QuestionBreadcrumb question={question} />

        <QuestionDetailCard
          question={question}
          isOwner={isOwner}
          actionLoading={actionLoading}
          onToggleSave={toggleSave}
          onClose={closeDiscussion}
          onEdit={() => navigateTo(`/questions/${question.id}/edit`)}
          onDelete={handleDelete}
          requireAuth={requireAuth}
        />

        <AnswersSection
          answers={question.answers ?? []}
          answersCount={question.answers_count}
          isClosed={question.is_closed}
          isAuthenticated={isAuthenticated}
          actionLoading={actionLoading}
          requireAuth={requireAuth}
          onSubmitAnswer={submitAnswer}
          onReply={submitReply}
          loadReplies={loadReplies}
        />
      </div>

      <QuestionAiSidebar questionId={question.id} questionTitle={question.title} />
    </main>
  );
};
