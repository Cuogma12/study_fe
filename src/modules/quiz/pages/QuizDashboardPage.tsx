'use client';

import { Text } from '@/shared/components/atoms';
import { QuizContinueConfirmModal } from '../components/molecules/QuizContinueConfirmModal';
import { QuizDashboardFilters } from '../components/molecules/QuizDashboardFilters';
import { QuizDashboardGrid } from '../components/organisms/QuizDashboardGrid';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizDashboardLayout } from '../components/organisms/QuizDashboardLayout';
import { QuizDashboardState } from '../components/organisms/QuizDashboardState';
import { useQuizDashboard } from '../hooks/useQuizDashboard';
import { QuizSetType } from '../types/quiz';

export const QuizDashboardPage = () => {
  const {
    t,
    ready,
    isAuthenticated,
    loading,
    loadingMore,
    hasMore,
    error,
    cards,
    keyword,
    subjectFilter,
    gradeFilter,
    setTypeFilter,
    subjectOptions,
    gradeOptions,
    setTypeOptions,
    startingSetId,
    continueConfirm,
    sentinelRef,
    setKeyword,
    setSubjectFilter,
    setGradeFilter,
    setSetTypeFilter,
    startSet,
    confirmContinue,
    cancelContinue,
  } = useQuizDashboard();

  const setTypeLabel = (setType: QuizSetType) =>
    t(`filters.set_type_${setType}` as 'filters.set_type_midterm');

  if (!ready || !isAuthenticated) {
    return (
      <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center bg-slate-50/60 px-4 py-12 dark:bg-slate-950/40">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  return (
    <QuizDashboardLayout>
      <QuizDashboardHeader title={t('exam_sets_title')} description={t('bank_description')} />

      <QuizDashboardFilters
        keyword={keyword}
        subjectFilter={subjectFilter}
        gradeFilter={gradeFilter}
        setTypeFilter={setTypeFilter}
        subjectOptions={subjectOptions}
        gradeOptions={gradeOptions}
        setTypeOptions={setTypeOptions}
        searchPlaceholder={t('filters.search_placeholder')}
        onKeywordChange={setKeyword}
        onSubjectChange={setSubjectFilter}
        onGradeChange={setGradeFilter}
        onSetTypeChange={setSetTypeFilter}
      />

      <QuizDashboardState
        loading={loading}
        error={error}
        empty={!loading && !error && cards.length === 0}
        loadingText={t('loading')}
        emptyText={t('empty')}
      />

      {!loading && !error && cards.length > 0 ? (
        <>
          <QuizDashboardGrid
            cards={cards}
            setTypeLabel={setTypeLabel}
            questionCountText={(count) => t('card.question_count', { count })}
            durationText={(minutes) => t('card.duration_minutes', { minutes })}
            startText={t('card.start_action')}
            continueText={t('card.continue_action')}
            startingText={t('card.starting')}
            startingSetId={startingSetId}
            onStart={startSet}
          />

          <div ref={sentinelRef} className="h-8 w-full" aria-hidden />

          {loadingMore ? (
            <Text variant="body2" className="py-3 text-center !text-slate-500">
              {t('loading_more')}
            </Text>
          ) : null}

          {!hasMore ? (
            <Text variant="caption" className="pb-2 pt-1 text-center !text-slate-400">
              {t('end_of_list')}
            </Text>
          ) : null}
        </>
      ) : null}

      <QuizContinueConfirmModal
        open={Boolean(continueConfirm)}
        title={t('continue_confirm.title')}
        description={
          continueConfirm?.title
            ? t('continue_confirm.description_named', { title: continueConfirm.title })
            : t('continue_confirm.description')
        }
        confirmText={t('continue_confirm.confirm')}
        cancelText={t('continue_confirm.cancel')}
        confirming={Boolean(startingSetId)}
        onConfirm={confirmContinue}
        onCancel={cancelContinue}
      />
    </QuizDashboardLayout>
  );
};
