import { Text } from '@/shared/components/atoms';

interface QuizDashboardSubjectProgressRowProps {
  name: string;
  percent: number;
}

export const QuizDashboardSubjectProgressRow = ({
  name,
  percent,
}: QuizDashboardSubjectProgressRowProps) => {
  return (
    <div>
      <div className="mb-1 flex items-end justify-between">
        <Text variant="body2" className="!font-medium">
          {name}
        </Text>
        <Text variant="small" className="!text-slate-500">
          {percent}%
        </Text>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
