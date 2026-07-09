import { Text } from '@/shared/components/atoms';

interface QuizDashboardChartProps {
  title: string;
  periodText: string;
}

export const QuizDashboardChart = ({ title, periodText }: QuizDashboardChartProps) => {
  return (
    <section className="relative h-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Text variant="h6" className="!font-semibold">
          {title}
        </Text>
        <Text variant="small" className="rounded px-2 py-1 !text-primary">
          {periodText}
        </Text>
      </div>
      <div className="absolute inset-x-4 bottom-4 top-14 rounded-xl bg-gradient-to-t from-indigo-100 to-indigo-50" />
    </section>
  );
};
