'use client';

import { QuizDashboardFilters } from '../components/molecules/QuizDashboardFilters';
import { QuizDashboardChart } from '../components/organisms/QuizDashboardChart';
import { QuizDashboardGrid } from '../components/organisms/QuizDashboardGrid';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizDashboardHistoryTable } from '../components/organisms/QuizDashboardHistoryTable';
import { QuizDashboardMastery } from '../components/organisms/QuizDashboardMastery';
import { QuizDashboardQuickActions } from '../components/organisms/QuizDashboardQuickActions';
import { QuizDashboardSidebar } from '../components/organisms/QuizDashboardSidebar';
import { QuizDashboardState } from '../components/organisms/QuizDashboardState';
import { QuizDashboardStats } from '../components/organisms/QuizDashboardStats';
import { useQuizDashboard } from '../hooks/useQuizDashboard';

export const QuizDashboardPage = () => {
  const {
    t,
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
    activeTab,
    goToOverview,
    goToMyQuizzes,
    overviewStats,
    historyItems,
    masteryItems,
    goToBuilder,
  } = useQuizDashboard();

  return (
    <main className="mx-auto flex w-full max-w-7xl">
      <QuizDashboardSidebar
        createActionText={t('create_action')}
        brandTitle={t('sidebar.brand_title')}
        brandSubtitle={t('sidebar.brand_subtitle')}
        menus={{
          overview: t('sidebar.overview'),
          myQuizzes: t('sidebar.my_quizzes'),
          flashcards: t('sidebar.statistics'),
          progress: t('sidebar.classrooms'),
          settings: t('sidebar.ai_assistant'),
          help: t('sidebar.help_center'),
        }}
        activeTab={activeTab}
        onGoOverview={goToOverview}
        onGoMyQuizzes={goToMyQuizzes}
        onCreate={() => goToBuilder()}
      />

      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <QuizDashboardHeader
          greetingText={t('greeting')}
          title={activeTab === 'overview' ? t('title') : t('my_quizzes_title')}
          description={t('description')}
          createActionText={t('create_action')}
          hideCreateOnDesktop
          onCreate={() => goToBuilder()}
        />

        {activeTab === 'my-quizzes' ? (
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
        ) : null}

        {activeTab === 'overview' ? (
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <QuizDashboardStats cards={overviewStats} />
              <QuizDashboardChart
                title={t('overview.chart.title')}
                periodText={t('overview.chart.period')}
              />
              <QuizDashboardHistoryTable
                title={t('overview.history.title')}
                viewAllText={t('overview.history.view_all')}
                columns={{
                  quiz: t('overview.history.columns.quiz'),
                  time: t('overview.history.columns.time'),
                  score: t('overview.history.columns.score'),
                  status: t('overview.history.columns.status'),
                  action: t('overview.history.columns.action'),
                }}
                passText={t('overview.history.pass')}
                failText={t('overview.history.fail')}
                reviewText={t('overview.history.review_action')}
                items={historyItems}
              />
            </div>

            <div className="flex flex-col gap-4">
              <QuizDashboardQuickActions
                title={t('overview.quick_actions.title')}
                createQuizText={t('overview.quick_actions.create_quiz')}
                createAiText={t('overview.quick_actions.create_ai')}
                onCreateQuiz={() => goToBuilder()}
              />
              <QuizDashboardMastery
                title={t('overview.mastery.title')}
                items={masteryItems}
              />
            </div>
          </div>
        ) : null}

        {activeTab === 'my-quizzes' ? (
          <>
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
          </>
        ) : null}
      </div>
    </main>
  );
};
