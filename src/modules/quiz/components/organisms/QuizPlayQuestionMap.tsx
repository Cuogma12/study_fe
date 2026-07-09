'use client';

import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { QuizQuestion } from '../../types/quiz';
import { quizPlayLayout } from '../../constants/quizPlayStyles';

interface QuizPlayQuestionMapProps {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  title: string;
  answeredSummary: string;
  onSelectQuestion: (index: number) => void;
}

export const QuizPlayQuestionMap = ({
  questions,
  currentIndex,
  answers,
  title,
  answeredSummary,
  onSelectQuestion,
}: QuizPlayQuestionMapProps) => {
  const t = useTranslations('quiz.play.minimap');
  const answeredCount = questions.filter((question) => Boolean(answers[question.id])).length;

  return (
    <aside className={quizPlayLayout.minimap}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <Text variant="body2" className="!font-semibold !text-slate-800 dark:!text-slate-100">
          {title}
        </Text>
        <Text variant="caption" className="!text-xs !text-slate-500">
          {answeredSummary}
        </Text>
      </div>

      <div className={quizPlayLayout.minimapGrid}>
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = Boolean(answers[question.id]);

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelectQuestion(index)}
              aria-label={t('question_aria', { index: index + 1 })}
              aria-current={isCurrent ? 'step' : undefined}
              className={`${quizPlayLayout.minimapItem} ${
                isCurrent
                  ? quizPlayLayout.minimapItemCurrent
                  : isAnswered
                    ? quizPlayLayout.minimapItemAnswered
                    : quizPlayLayout.minimapItemDefault
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-md ${quizPlayLayout.minimapLegendCurrent}`} />
          {t('legend_current')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-md ${quizPlayLayout.minimapLegendAnswered}`} />
          {t('legend_answered', { count: answeredCount })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-md ${quizPlayLayout.minimapLegendDefault}`} />
          {t('legend_unanswered')}
        </span>
      </div>
    </aside>
  );
};
