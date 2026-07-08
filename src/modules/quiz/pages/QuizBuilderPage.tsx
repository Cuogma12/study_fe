'use client';
import { Button, Select, Text } from '@/shared/components/atoms';
import { useQuizBuilder } from '../hooks/useQuizBuilder';
import { QuizBuilderField } from '../components/molecules/QuizBuilderField';

export const QuizBuilderPage = () => {
  const {
    t,
    subjectsLoading,
    subjectId,
    topicId,
    gradeLevel,
    limit,
    error,
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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <Text variant="h3" className="!font-black">
          {t('title')}
        </Text>
        <Text variant="body2" className="mt-1 !text-slate-500">
          {t('description')}
        </Text>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
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

          <div>
            <Text variant="small" className="mb-2 !font-semibold !text-slate-600">
              {t('fields.limit')}
            </Text>
            <Select
              value={limit}
              disabled={submitting}
              options={limitOptions}
              onChange={(event) => onLimitChange(Number(event.target.value))}
            />
          </div>
        </div>

        {error ? (
          <Text variant="body2" className="mt-4 !text-red-500">
            {error}
          </Text>
        ) : null}

        <div className="mt-6 flex justify-end">
          <Button onClick={generateQuiz} disabled={!canGenerate} className="min-w-[180px]">
            {submitting ? t('actions.generating') : t('actions.generate')}
          </Button>
        </div>
      </div>
    </main>
  );
};
