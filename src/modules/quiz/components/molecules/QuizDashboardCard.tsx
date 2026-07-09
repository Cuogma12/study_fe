import { Button, MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizDashboardCardProps {
  subjectName: string;
  topicName: string;
  gradeText: string;
  unknownCountText: string;
  startText: string;
  onStart: () => void;
}

export const QuizDashboardCard = ({
  subjectName,
  topicName,
  gradeText,
  unknownCountText,
  startText,
  onStart,
}: QuizDashboardCardProps) => {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-indigo-50 text-primary">
        <MaterialIcon icon="quiz" size="text-3xl" />
      </div>

      <div className="mb-2 flex gap-2">
        <Text as="span" variant="small" className="rounded bg-slate-100 px-2 py-1 !text-slate-600">
          {subjectName}
        </Text>
        <Text as="span" variant="small" className="rounded bg-slate-100 px-2 py-1 !text-slate-600">
          {gradeText}
        </Text>
      </div>

      <Text variant="body1" className="line-clamp-2 !font-semibold">
        {topicName}
      </Text>

      <Text variant="body2" className="mt-2 !text-slate-500">
        {unknownCountText}
      </Text>

      <Button className="mt-4 w-full" onClick={onStart}>
        {startText}
      </Button>
    </article>
  );
};
