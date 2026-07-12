'use client';

import { Button, Text } from '@/shared/components/atoms';
import { useQuizBuilder } from '../hooks/useQuizBuilder';
import { QuizBuilderField } from '../components/molecules/QuizBuilderField';
import { QuizBuilderLimitField } from '../components/molecules/QuizBuilderLimitField';
import { QuizBuilderTitleField } from '../components/molecules/QuizBuilderTitleField';
import { QuizFormAlert } from '../components/molecules/QuizFormAlert';
import { QuizDashboardHeader } from '../components/organisms/QuizDashboardHeader';
import { QuizBuilderQuickPick } from '../components/organisms/QuizBuilderQuickPick';
import { QuizDashboardLayout } from '../components/organisms/QuizDashboardLayout';
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
    title,
    autoTitle,
    titleDuplicateHint,
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
    templateItems,
    activeTemplateKey,
    applyTemplate,
    onSubjectChange,
    onGradeChange,
    onTopicChange,
    onTitleChange,
    onLimitChange,
    generateQuiz,
  } = useQuizBuilder();

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
      <QuizDashboardHeader title={t('title')} description={t('description')} />

      <div className={quizDashboardPanel.shell}>
        {loadError ? <QuizFormAlert message={loadError} className="mb-4" /> : null}

        <div className="grid gap-5 md:grid-cols-2">
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

          <QuizBuilderTitleField
            label={t('fields.title')}
            value={title}
            disabled={submitting}
            placeholder={autoTitle || t('placeholders.title')}
            hint={t('title_hint')}
            warning={titleDuplicateHint}
            onChange={onTitleChange}
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

      <QuizBuilderQuickPick
        sectionTitle={t('templates.section_title')}
        sectionDescription={t('templates.section_description')}
        templates={templateItems}
        activeTemplateKey={activeTemplateKey}
        aiTitle={t('ai.title')}
        aiDescription={t('ai.description')}
        aiBadgeText={t('ai.coming_soon')}
        onSelectTemplate={applyTemplate}
      />
    </QuizDashboardLayout>
  );
};
