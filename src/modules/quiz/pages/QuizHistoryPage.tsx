'use client';

import { Button, Text } from '@/shared/components/atoms';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizDashboardLayout } from '../components/organisms/QuizDashboardLayout';
import { QuizDashboardState } from '../components/organisms/QuizDashboardState';
import { QuizHistoryItemCard } from '../components/molecules/QuizHistoryItemCard';
import { useQuizHistory } from '../hooks/useQuizHistory';

export const QuizHistoryPage = () => {
  const {
    t,
    ready,
    isAuthenticated,
    tab,
    setTab,
    items,
    loading,
    error,
    page,
    totalPages,
    setPage,
    goToBuilder,
    viewResult,
    continueQuiz,
  } = useQuizHistory();

  if (!ready || !isAuthenticated) {
    return (
      <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center bg-slate-50/60 px-4 py-12 dark:bg-slate-950/40">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  const emptyText = tab === 'in_progress' ? t('empty_in_progress') : t('empty_submitted');

  return (
    <QuizDashboardLayout createActionText={t('create_action')} onCreate={goToBuilder}>
      <QuizDashboardHeader
        title={t('title')}
        description={t('description')}
        createActionText={t('create_action')}
        hideCreateOnDesktop
        onCreate={goToBuilder}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button
          variant={tab === 'in_progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTab('in_progress')}
        >
          {t('tabs.in_progress')}
        </Button>
        <Button
          variant={tab === 'submitted' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTab('submitted')}
        >
          {t('tabs.submitted')}
        </Button>
      </div>

      <QuizDashboardState
        loading={loading}
        error={error}
        empty={!loading && !error && items.length === 0}
        loadingText={t('loading')}
        emptyText={emptyText}
      />

      {!loading && !error && items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <QuizHistoryItemCard
              key={item.attempt_id}
              item={item}
              scoreLabel={t('card.score')}
              progressLabel={t('card.progress')}
              questionsLabel={t('card.questions')}
              submittedLabel={t('card.submitted_at')}
              createdLabel={t('card.updated_at')}
              statusInProgressLabel={t('card.status_in_progress')}
              statusSubmittedLabel={t('card.status_submitted')}
              viewResultText={t('card.view_result')}
              continueText={t('card.continue')}
              onViewResult={viewResult}
              onContinue={continueQuiz}
            />
          ))}

          {totalPages > 1 ? (
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                {t('pagination.prev')}
              </Button>
              <Text variant="body2" className="!text-slate-500">
                {t('pagination.summary', { page, total_pages: totalPages })}
              </Text>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                {t('pagination.next')}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </QuizDashboardLayout>
  );
};
