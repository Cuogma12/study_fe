import { quizPlayLayout } from '../../constants/quizPlayStyles';

interface QuizPlayOptionListProps {
  questionId: string;
  options: Record<string, string>;
  selectedAnswer?: string;
  onChooseAnswer: (questionId: string, option: string) => void;
}

const formatOptionText = (value: unknown) => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
};

export const QuizPlayOptionList = ({
  questionId,
  options,
  selectedAnswer,
  onChooseAnswer,
}: QuizPlayOptionListProps) => {
  const entries = Object.entries(options ?? {});

  return (
    <div className="flex flex-col gap-3">
      {entries.map(([optionKey, optionValue]) => {
        const isSelected = selectedAnswer === optionKey;

        return (
          <button
            key={`${questionId}-${optionKey}`}
            type="button"
            onClick={() => onChooseAnswer(questionId, optionKey)}
            aria-pressed={isSelected}
            className={`${quizPlayLayout.optionButton} ${
              isSelected ? quizPlayLayout.optionButtonSelected : quizPlayLayout.optionButtonDefault
            }`}
          >
            <span
              className={
                isSelected ? quizPlayLayout.optionLetterSelected : quizPlayLayout.optionLetter
              }
            >
              {optionKey}
            </span>
            <span className={quizPlayLayout.optionText}>{formatOptionText(optionValue)}</span>
          </button>
        );
      })}
    </div>
  );
};
