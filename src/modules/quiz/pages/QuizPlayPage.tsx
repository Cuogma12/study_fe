'use client';

import { Button, Text } from '@/shared/components/atoms';
import { useQuizPlay } from '../hooks/useQuizPlay';
import { QuizFormAlert } from '../components/molecules/QuizFormAlert';
import { QuizPlayHeader } from '../components/organisms/QuizPlayHeader';
import { QuizPlayFooter } from '../components/organisms/QuizPlayFooter';
import { QuizPlayProgress } from '../components/molecules/QuizPlayProgress';
import { QuizPlayOptionList } from '../components/molecules/QuizPlayOptionList';
import { QuizPlayQuestionMap } from '../components/organisms/QuizPlayQuestionMap';
import { quizPlayLayout } from '../constants/quizPlayStyles';

export const QuizPlayPage = () => {
  const {
    t,
    ready,
    isAuthenticated,
    loading,
    questions,
    currentQuestion,
    currentIndex,
    answers,
    answeredCount,
    examTitle,
    timeLabel,
    questionProgressLabel,
    percentLabel,
    totalQuestions,
    error,
    submitting,
    canSubmit,
    canGoPrevious,
    canGoNext,
    chooseAnswer,
    goToPrevious,
    goToNext,
    goToQuestion,
    submitQuiz,
    exitQuiz,
    backToBuilder,
  } = useQuizPlay();

  if (!ready || !isAuthenticated) {
    return (
      <div className={quizPlayLayout.page}>
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <Text variant="body2" className="!text-slate-500">
            {t('loading')}
          </Text>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={quizPlayLayout.page}>
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <Text variant="body2" className="!text-slate-500">
            {t('loading')}
          </Text>
        </main>
      </div>
    );
  }

  if (!questions.length || !currentQuestion) {
    return (
      <div className={quizPlayLayout.page}>
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
      </div>
    );
  }

  return (
    <div className={quizPlayLayout.page}>
      <QuizPlayHeader examTitle={examTitle} timeLabel={timeLabel} onExit={exitQuiz} />

      <main className={quizPlayLayout.main}>
        <div className={quizPlayLayout.body}>
          <div className={quizPlayLayout.content}>
            <div className="flex justify-end text-right sm:hidden">
              <Text variant="caption" className="!text-xs !text-slate-500">
                {examTitle}
              </Text>
              <Text variant="body2" className="!font-bold !text-primary">
                {timeLabel}
              </Text>
            </div>

            <QuizPlayProgress
              totalQuestions={totalQuestions}
              answeredCount={answeredCount}
              percentLabel={percentLabel}
              questionProgressLabel={questionProgressLabel}
            />

            <div className={quizPlayLayout.questionCard}>
              <Text variant="body1" className="!text-lg !leading-relaxed">
                {currentQuestion.question_text}
              </Text>
            </div>

            <QuizPlayOptionList
              questionId={currentQuestion.id}
              options={currentQuestion.options}
              selectedAnswer={answers[currentQuestion.id]}
              onChooseAnswer={chooseAnswer}
            />

            {error ? <QuizFormAlert message={error} /> : null}
          </div>

          <QuizPlayQuestionMap
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            title={t('minimap.title')}
            answeredSummary={t('minimap.answered', {
              answered: answeredCount,
              total: totalQuestions,
            })}
            onSelectQuestion={goToQuestion}
          />
        </div>
      </main>

      <QuizPlayFooter
        prevLabel={t('prev_question')}
        nextLabel={t('next_question')}
        submitLabel={t('submit')}
        submittingLabel={t('submitting')}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        canSubmit={canSubmit}
        submitting={submitting}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSubmit={submitQuiz}
      />
    </div>
  );
};
