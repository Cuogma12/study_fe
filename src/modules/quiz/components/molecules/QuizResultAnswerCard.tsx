import { Text } from '@/shared/components/atoms';
import { QuizAttemptAnswer } from '../../types/quiz';

interface QuizResultAnswerCardProps {
  answer: QuizAttemptAnswer;
  questionLabel: string;
  badgeCorrectText: string;
  badgeIncorrectText: string;
  selectedAnswerText: string;
  correctAnswerText: string;
  explanationText: string;
}

export const QuizResultAnswerCard = ({
  answer,
  questionLabel,
  badgeCorrectText,
  badgeIncorrectText,
  selectedAnswerText,
  correctAnswerText,
  explanationText,
}: QuizResultAnswerCardProps) => {
  const selectedValue = answer.options?.[answer.selected_answer] ?? '';
  const correctValue = answer.options?.[answer.correct_answer] ?? '';

  return (
    <section className="rounded-xl border border-slate-300 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Text variant="body1" className="!font-semibold">
          {questionLabel}: {answer.question_text}
        </Text>
        <Text
          as="span"
          variant="small"
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            answer.is_correct
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          {answer.is_correct ? badgeCorrectText : badgeIncorrectText}
        </Text>
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <Text variant="body2" className="!text-slate-700">
          <Text as="span" variant="body2" className="!font-semibold">
            {selectedAnswerText}:
          </Text>{' '}
          {answer.selected_answer}. {selectedValue}
        </Text>
        <Text variant="body2" className="!text-emerald-700">
          <Text as="span" variant="body2" className="!font-semibold !text-emerald-700">
            {correctAnswerText}:
          </Text>{' '}
          {answer.correct_answer}. {correctValue}
        </Text>
      </div>

      {answer.explanation ? (
        <Text variant="body2" className="mt-2 !text-slate-600">
          {explanationText}: {answer.explanation}
        </Text>
      ) : null}
    </section>
  );
};
