import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizDashboardCardProps {
  subjectName: string;
  topicName: string;
  gradeText: string;
  questionCountText: string;
  startText: string;
  onStart: () => void;
}

export const QuizDashboardCard = ({
  subjectName,
  topicName,
  gradeText,
  questionCountText,
  startText,
  onStart,
}: QuizDashboardCardProps) => {
  return (
    <article
      className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover} flex flex-col`}
    >
      <div className="mb-3 flex h-20 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/80 text-primary dark:border-primary/20 dark:bg-primary/10">
        <MaterialIcon icon="quiz" size="text-3xl" />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 !text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:!text-slate-300"
        >
          {subjectName}
        </Text>
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 !text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:!text-slate-300"
        >
          {gradeText}
        </Text>
      </div>

      <Text variant="body1" className="line-clamp-2 !font-semibold">
        {topicName}
      </Text>

      <Text variant="body2" className="mt-2 !text-slate-500">
        {questionCountText}
      </Text>

      <Button className="mt-4 w-full shadow-sm" onClick={onStart}>
        {startText}
      </Button>
    </article>
  );
};
