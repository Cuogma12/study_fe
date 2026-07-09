'use client';
import { Button, Text } from '@/shared/components/atoms';
import { useQuizBuilder } from '../hooks/useQuizBuilder';
import { QuizBuilderField } from '../components/molecules/QuizBuilderField';
import { QuizBuilderLimitField } from '../components/molecules/QuizBuilderLimitField';
import { QuizFormAlert } from '../components/molecules/QuizFormAlert';
import { quizDashboardPanel } from '../constants/quizDashboardStyles';

export const QuizBuilderPage = () => {
  const {
    t,
    ready,
    isAuthenticated,
    subjectsLoading,
    subjectId,
    topicId,
    gradeLevel,
    limit,
    limitError,
    minLimit,
    maxLimit,
    loadError,
    submitError,
    submitting,
    subjectOptions,
    gradeOptions,
    topicOptions,
    limitOptions,
    canGenerate,
    onSubjectChange,
    onGradeChange,
    onTopicChange,
    onLimitChange,
    generateQuiz,
  } = useQuizBuilder();

  if (!ready || !isAuthenticated) {
    return (
      <main className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-12">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50/60 px-4 py-6 dark:bg-slate-950/40 sm:px-6 lg:px-8">
      <div className={quizDashboardPanel.shell}>
        <Text variant="h3" className="!font-black">
          {t('title')}
        </Text>
        <Text variant="body2" className="mt-1 !text-slate-500">
          {t('description')}
        </Text>

        {loadError ? <QuizFormAlert message={loadError} className="mt-4" /> : null}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <QuizBuilderField
            label={t('fields.subject')}
            value={subjectId}
            disabled={subjectsLoading || submitting}
            placeholder={t('placeholders.subject')}
            options={subjectOptions}
            onChange={onSubjectChange}
          />

          <QuizBuilderField
            label={t('fields.grade_level')}
            value={gradeLevel}
            disabled={subjectsLoading || submitting}
            placeholder={t('placeholders.grade_level')}
            options={gradeOptions}
            onChange={onGradeChange}
          />

          <QuizBuilderField
            label={t('fields.topic')}
            value={topicId}
            disabled={!subjectId || !gradeLevel || submitting}
            placeholder={
              !subjectId
                ? t('placeholders.topic_subject_required')
                : !gradeLevel
                  ? t('placeholders.topic_grade_required')
                  : t('placeholders.topic')
            }
            options={topicOptions}
            onChange={onTopicChange}
          />

          <QuizBuilderLimitField
            label={t('fields.limit')}
            value={limit}
            min={minLimit}
            max={maxLimit}
            disabled={submitting}
            presetOptions={limitOptions}
            customPlaceholder={t('placeholders.limit_custom')}
            hint={t('limit_hint', { min: minLimit, max: maxLimit })}
            error={limitError}
            onChange={onLimitChange}
          />
        </div>

        <div className="mt-6 border-t border-gray-200 pt-5 dark:border-slate-700">
          {submitError ? <QuizFormAlert message={submitError} className="mb-4" /> : null}
          <div className="flex justify-end">
            <Button onClick={generateQuiz} disabled={!canGenerate} className="min-w-[180px]">
              {submitting ? t('actions.generating') : t('actions.generate')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
