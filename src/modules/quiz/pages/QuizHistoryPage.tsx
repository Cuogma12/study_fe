'use client';

import { Button, Text } from '@/shared/components/atoms';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizDashboardLayout } from '../components/organisms/QuizDashboardLayout';
import { QuizDashboardState } from '../components/organisms/QuizDashboardState';
import { QuizHistoryFilters } from '../components/molecules/QuizHistoryFilters';
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
    keyword,
    setKeyword,
    subjectFilter,
    setSubjectFilter,
    gradeFilter,
    setGradeFilter,
    modeFilter,
    setModeFilter,
    subjectOptions,
    gradeOptions,
    modeOptions,
    viewResult,
    continueQuiz,
  } = useQuizHistory();

  if (!ready || !isAuthenticated) {
    return (
      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-center justify-center px-4 py-12 lg:px-10">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  const emptyText = tab === 'in_progress' ? t('empty_in_progress') : t('empty_submitted');

  return (
    <QuizDashboardLayout>
      <QuizDashboardHeader title={t('title')} description={t('description')} />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button
          variant={tab === 'in_progress' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setTab('in_progress')}
        >
          {t('tabs.in_progress')}
        </Button>
        <Button
          variant={tab === 'submitted' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setTab('submitted')}
        >
          {t('tabs.submitted')}
        </Button>
      </div>

      {tab === 'submitted' ? (
        <QuizHistoryFilters
          keyword={keyword}
          subjectFilter={subjectFilter}
          gradeFilter={gradeFilter}
          modeFilter={modeFilter}
          subjectOptions={subjectOptions}
          gradeOptions={gradeOptions}
          modeOptions={modeOptions}
          searchPlaceholder={t('filters.search_placeholder')}
          subjectLabel={t('filters.subject')}
          gradeLabel={t('filters.grade')}
          modeLabel={t('filters.mode')}
          onKeywordChange={setKeyword}
          onSubjectChange={setSubjectFilter}
          onGradeChange={setGradeFilter}
          onModeChange={setModeFilter}
        />
      ) : null}

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
              modePracticeLabel={t('card.mode_practice')}
              modeExamLabel={t('card.mode_exam')}
              viewResultText={t('card.view_result')}
              continueText={t('card.continue')}
              onViewResult={viewResult}
              onContinue={continueQuiz}
            />
          ))}

          {totalPages > 1 ? (
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
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
