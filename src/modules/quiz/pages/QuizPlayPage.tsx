'use client';

import { Button, Text } from '@/shared/components/atoms';
import { useQuizPlay } from '../hooks/useQuizPlay';
import { QuizPlayQuestionCard } from '../components/molecules/QuizPlayQuestionCard';

export const QuizPlayPage = () => {
  const {
    t,
    questions,
    answers,
    answeredCount,
    totalQuestions,
    error,
    submitting,
    canSubmit,
    chooseAnswer,
    submitQuiz,
    backToBuilder,
  } = useQuizPlay();

  if (!questions.length) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <Text variant="h4" className="!font-bold">
            {t('empty.title')}
          </Text>
          <Text variant="body2" className="mt-2 !text-slate-500">
            {t('empty.description')}
          </Text>
          <Button className="mt-5" onClick={backToBuilder}>
            {t('empty.back_action')}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Text variant="h4" className="!font-black">
              {t('title')}
            </Text>
            <Text variant="body2" className="mt-1 !text-slate-500">
              {t('progress', { answered: answeredCount, total: totalQuestions })}
            </Text>
          </div>
          <Button variant="outline" size="sm" onClick={backToBuilder}>
            {t('change_quiz')}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {questions.map((question, index) => {
            return (
              <QuizPlayQuestionCard
                key={question.id}
                question={question}
                index={index}
                selectedAnswer={answers[question.id]}
                questionLabel={t('question_label', { index: index + 1 })}
                onChooseAnswer={chooseAnswer}
              />
            );
          })}
        </div>

        {error ? (
          <Text variant="body2" className="mt-4 !text-red-500">
            {error}
          </Text>
        ) : null}

        <div className="mt-6 flex justify-end">
          <Button onClick={submitQuiz} disabled={!canSubmit} className="min-w-[180px]">
            {submitting ? t('submitting') : t('submit')}
          </Button>
        </div>
      </div>
    </main>
  );
};
