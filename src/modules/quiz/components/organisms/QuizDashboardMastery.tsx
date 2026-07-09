import { Text } from '@/shared/components/atoms';
import { QuizDashboardSubjectProgressRow } from '../molecules/QuizDashboardSubjectProgressRow';

interface QuizDashboardMasteryProps {
  title: string;
  items: Array<{ name: string; percent: number }>;
}

export const QuizDashboardMastery = ({ title, items }: QuizDashboardMasteryProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Text variant="h6" className="mb-3 !font-semibold">
        {title}
      </Text>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <QuizDashboardSubjectProgressRow
            key={`${item.name}-${item.percent}`}
            name={item.name}
            percent={item.percent}
          />
        ))}
      </div>
    </section>
  );
};
