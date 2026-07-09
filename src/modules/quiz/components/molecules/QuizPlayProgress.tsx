import { Text } from '@/shared/components/atoms';

interface QuizPlayProgressProps {
  totalQuestions: number;
  answeredCount: number;
  percentLabel: string;
  questionProgressLabel: string;
}

export const QuizPlayProgress = ({
  totalQuestions,
  answeredCount,
  percentLabel,
  questionProgressLabel,
}: QuizPlayProgressProps) => {
  const barWidth = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between">
        <Text variant="h4" className="!text-2xl !font-semibold">
          {questionProgressLabel}
        </Text>
        <Text variant="body2" className="!text-sm !text-slate-500">
          {percentLabel}
        </Text>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
};
