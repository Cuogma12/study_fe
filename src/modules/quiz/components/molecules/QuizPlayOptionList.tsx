import { quizPlayLayout } from '../../constants/quizPlayStyles';

interface QuizPlayOptionListProps {
  questionId: string;
  options: Record<string, string>;
  selectedAnswer?: string;
  locked?: boolean;
  correctAnswer?: string | null;
  showResult?: boolean;
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
  locked = false,
  correctAnswer = null,
  showResult = false,
  onChooseAnswer,
}: QuizPlayOptionListProps) => {
  const entries = Object.entries(options ?? {});

  return (
    <div className="flex flex-col gap-3">
      {entries.map(([optionKey, optionValue]) => {
        const isSelected = selectedAnswer === optionKey;
        const isCorrectOption = showResult && correctAnswer === optionKey;
        const isWrongSelected = showResult && isSelected && correctAnswer !== optionKey;

        let buttonClass: string = quizPlayLayout.optionButtonDefault;
        let letterClass: string = quizPlayLayout.optionLetter;

        if (isCorrectOption) {
          buttonClass = quizPlayLayout.optionButtonCorrect;
          letterClass = quizPlayLayout.optionLetterCorrect;
        } else if (isWrongSelected) {
          buttonClass = quizPlayLayout.optionButtonWrong;
          letterClass = quizPlayLayout.optionLetterWrong;
        } else if (isSelected) {
          buttonClass = quizPlayLayout.optionButtonSelected;
          letterClass = quizPlayLayout.optionLetterSelected;
        }

        return (
          <button
            key={`${questionId}-${optionKey}`}
            type="button"
            disabled={locked}
            onClick={() => onChooseAnswer(questionId, optionKey)}
            aria-pressed={isSelected}
            className={`${quizPlayLayout.optionButton} ${buttonClass} ${
              locked ? quizPlayLayout.optionButtonLocked : ''
            }`}
          >
            <span className={letterClass}>{optionKey}</span>
            <span className={quizPlayLayout.optionText}>{formatOptionText(optionValue)}</span>
          </button>
        );
      })}
    </div>
  );
};
