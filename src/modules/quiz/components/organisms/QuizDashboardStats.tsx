import { QuizDashboardStatCard } from '../molecules/QuizDashboardStatCard';

interface QuizDashboardStatsProps {
  cards: Array<{
    icon: string;
    value: string;
    label: string;
    tone?: 'default' | 'primary';
  }>;
}

export const QuizDashboardStats = ({ cards }: QuizDashboardStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((card) => (
        <QuizDashboardStatCard
          key={`${card.label}-${card.value}`}
          icon={card.icon}
          value={card.value}
          label={card.label}
          tone={card.tone}
        />
      ))}
    </div>
  );
};
