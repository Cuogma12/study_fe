'use client';

import { Button, Text } from '@/shared/components/atoms';
import { useQuizResult } from '../hooks/useQuizResult';
import { QuizResultAnswerCard } from '../components/molecules/QuizResultAnswerCard';
import { QuizResultStats } from '../components/organisms/QuizResultStats';

interface QuizResultPageProps {
  attemptId: string;
}

export const QuizResultPage = ({ attemptId }: QuizResultPageProps) => {
  const { t, result, loading, error, retry, startNewQuiz } = useQuizResult(attemptId);

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-5xl justify-center px-4 py-10">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <Text variant="h4" className="!font-bold">
            {t('errors.title')}
          </Text>
          <Text variant="body2" className="mt-2 !text-red-500">
            {error ?? t('errors.load_failed')}
          </Text>
          <div className="mt-5 flex justify-center gap-2">
            <Button variant="outline" onClick={retry}>
              {t('errors.retry')}
            </Button>
            <Button onClick={startNewQuiz}>{t('errors.back_builder')}</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <Text variant="h3" className="!font-black">
          {t('title')}
        </Text>
        <Text variant="body2" className="mt-1 !text-slate-500">
          {t('summary', {
            correct: result.correct_count,
            total: result.total_questions,
            score: result.score,
          })}
        </Text>

        <QuizResultStats
          correctCount={result.correct_count}
          wrongCount={result.wrong_count}
          score={result.score}
          correctLabel={t('stats.correct')}
          wrongLabel={t('stats.wrong')}
          scoreLabel={t('stats.score')}
        />

        <div className="mt-6 space-y-4">
          {result.answers.map((answer, index) => {
            return (
              <QuizResultAnswerCard
                key={answer.quiz_question_id}
                answer={answer}
                questionLabel={t('question_label', { index: index + 1 })}
                badgeCorrectText={t('badge.correct')}
                badgeIncorrectText={t('badge.incorrect')}
                selectedAnswerText={t('selected_answer')}
                correctAnswerText={t('correct_answer')}
                explanationText={t('explanation')}
              />
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={startNewQuiz}>{t('new_quiz_action')}</Button>
        </div>
      </div>
    </main>
  );
};
