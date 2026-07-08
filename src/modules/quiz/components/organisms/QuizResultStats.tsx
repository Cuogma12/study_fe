import { Text } from '@/shared/components/atoms';

interface QuizResultStatsProps {
  correctCount: number;
  wrongCount: number;
  score: number;
  correctLabel: string;
  wrongLabel: string;
  scoreLabel: string;
}

export const QuizResultStats = ({
  correctCount,
  wrongCount,
  score,
  correctLabel,
  wrongLabel,
  scoreLabel,
}: QuizResultStatsProps) => {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <Text variant="small" className="!font-semibold !text-emerald-700">
          {correctLabel}
        </Text>
        <Text variant="h4" className="mt-1 !font-black !text-emerald-700">
          {correctCount}
        </Text>
      </div>
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
        <Text variant="small" className="!font-semibold !text-rose-700">
          {wrongLabel}
        </Text>
        <Text variant="h4" className="mt-1 !font-black !text-rose-700">
          {wrongCount}
        </Text>
      </div>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
        <Text variant="small" className="!font-semibold !text-indigo-700">
          {scoreLabel}
        </Text>
        <Text variant="h4" className="mt-1 !font-black !text-indigo-700">
          {score}
        </Text>
      </div>
    </div>
  );
};
