'use client';

import { Text } from '@/shared/components/atoms';
import { QuizDashboardFilters } from '../components/molecules/QuizDashboardFilters';
import { QuizDashboardGrid } from '../components/organisms/QuizDashboardGrid';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizDashboardLayout } from '../components/organisms/QuizDashboardLayout';
import { QuizDashboardState } from '../components/organisms/QuizDashboardState';
import { useQuizDashboard } from '../hooks/useQuizDashboard';

export const QuizDashboardPage = () => {
  const {
    t,
    ready,
    isAuthenticated,
    loading,
    error,
    cards,
    keyword,
    subjectFilter,
    gradeFilter,
    subjectOptions,
    gradeOptions,
    setKeyword,
    setSubjectFilter,
    setGradeFilter,
    goToBuilder,
  } = useQuizDashboard();

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
    <QuizDashboardLayout createActionText={t('create_action')} onCreate={() => goToBuilder()}>
      <QuizDashboardHeader
        title={t('my_quizzes_title')}
        description={t('bank_description')}
        createActionText={t('create_action')}
        hideCreateOnDesktop
        onCreate={() => goToBuilder()}
      />

      <QuizDashboardFilters
        keyword={keyword}
        subjectFilter={subjectFilter}
        gradeFilter={gradeFilter}
        subjectOptions={subjectOptions}
        gradeOptions={gradeOptions}
        searchPlaceholder={t('filters.search_placeholder')}
        onKeywordChange={setKeyword}
        onSubjectChange={setSubjectFilter}
        onGradeChange={setGradeFilter}
      />

      <QuizDashboardState
        loading={loading}
        error={error}
        empty={!loading && !error && cards.length === 0}
        loadingText={t('loading')}
        emptyText={t('empty')}
      />

      <QuizDashboardGrid
        cards={cards}
        questionCountText={(count) => t('card.question_count', { count })}
        startText={t('card.start_action')}
        onStart={goToBuilder}
      />
    </QuizDashboardLayout>
  );
};
