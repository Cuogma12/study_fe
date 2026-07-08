import { Text } from '@/shared/components/atoms';
import { QuizQuestion } from '../../types/quiz';

interface QuizPlayQuestionCardProps {
  question: QuizQuestion;
  index: number;
  selectedAnswer?: string;
  questionLabel: string;
  onChooseAnswer: (questionId: string, option: string) => void;
}

export const QuizPlayQuestionCard = ({
  question,
  index,
  selectedAnswer,
  questionLabel,
  onChooseAnswer,
}: QuizPlayQuestionCardProps) => {
  const options = Object.entries(question.options ?? {});

  return (
    <section className="rounded-xl border border-slate-200 p-4">
      <Text variant="body1" className="!font-semibold">
        {questionLabel}: {question.question_text}
      </Text>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map(([optionKey, optionValue]) => {
          const isSelected = selectedAnswer === optionKey;
          return (
            <button
              key={`${question.id}-${optionKey}-${index}`}
              type="button"
              onClick={() => onChooseAnswer(question.id, optionKey)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                isSelected
                  ? 'border-primary bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40'
              }`}
            >
              <Text as="span" variant="body2" className="!font-semibold">
                {optionKey}.
              </Text>{' '}
              <Text as="span" variant="body2">
                {optionValue}
              </Text>
            </button>
          );
        })}
      </div>
    </section>
  );
};
