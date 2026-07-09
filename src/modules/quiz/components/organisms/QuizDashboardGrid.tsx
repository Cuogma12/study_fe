import { QuizDashboardCard } from '../molecules/QuizDashboardCard';

interface QuizDashboardGridItem {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  gradeValue: number | null;
  gradeText: string;
  questionCount: number;
}

interface QuizDashboardGridProps {
  cards: QuizDashboardGridItem[];
  questionCountText: (count: number) => string;
  startText: string;
  onStart: (subjectId: string, topicId: string, gradeValue?: number | null) => void;
}

export const QuizDashboardGrid = ({
  cards,
  questionCountText,
  startText,
  onStart,
}: QuizDashboardGridProps) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <QuizDashboardCard
          key={card.id}
          subjectName={card.subjectName}
          topicName={card.topicName}
          gradeText={card.gradeText}
          questionCountText={questionCountText(card.questionCount)}
          startText={startText}
          onStart={() => onStart(card.subjectId, card.topicId, card.gradeValue)}
        />
      ))}
    </div>
  );
};
