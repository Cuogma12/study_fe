import { QuizDashboardCard } from '../molecules/QuizDashboardCard';
import { QuizSetType } from '../../types/quiz';

interface QuizDashboardGridItem {
  id: string;
  setId: string;
  title: string;
  subjectName: string;
  topicName: string;
  setType: QuizSetType;
  gradeText: string;
  questionCount: number;
  durationMinutes: number | null;
  hasInProgress: boolean;
  inProgressAttemptId: string | null;
}

interface QuizDashboardGridProps {
  cards: QuizDashboardGridItem[];
  setTypeLabel: (setType: QuizSetType) => string;
  questionCountText: (count: number) => string;
  durationText: (minutes: number) => string;
  startText: string;
  continueText: string;
  startingText: string;
  startingSetId: string | null;
  onStart: (setId: string, inProgressAttemptId?: string | null, title?: string) => void;
}

export const QuizDashboardGrid = ({
  cards,
  setTypeLabel,
  questionCountText,
  durationText,
  startText,
  continueText,
  startingText,
  startingSetId,
  onStart,
}: QuizDashboardGridProps) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <QuizDashboardCard
          key={card.id}
          title={card.title}
          subjectName={card.subjectName}
          topicName={card.topicName}
          setTypeLabel={setTypeLabel(card.setType)}
          gradeText={card.gradeText}
          questionCountText={questionCountText(card.questionCount)}
          durationText={card.durationMinutes ? durationText(card.durationMinutes) : null}
          startText={startText}
          continueText={continueText}
          startingText={startingText}
          hasInProgress={card.hasInProgress}
          starting={startingSetId === card.setId}
          onStart={() => onStart(card.setId, card.inProgressAttemptId, card.title)}
        />
      ))}
    </div>
  );
};
