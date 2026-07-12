import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizDashboardCardProps {
  title: string;
  subjectName: string;
  topicName: string;
  setTypeLabel: string;
  gradeText: string;
  questionCountText: string;
  durationText: string | null;
  startText: string;
  continueText: string;
  startingText: string;
  hasInProgress: boolean;
  starting: boolean;
  onStart: () => void;
}

export const QuizDashboardCard = ({
  title,
  subjectName,
  topicName,
  setTypeLabel,
  gradeText,
  questionCountText,
  durationText,
  startText,
  continueText,
  startingText,
  hasInProgress,
  starting,
  onStart,
}: QuizDashboardCardProps) => {
  return (
    <article
      className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover} flex flex-col`}
    >
      <div className="mb-3 flex h-20 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/80 text-primary dark:border-primary/20 dark:bg-primary/10">
        <MaterialIcon icon="description" size="text-3xl" />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 !text-primary"
        >
          {setTypeLabel}
        </Text>
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
        {title}
      </Text>

      {topicName ? (
        <Text variant="caption" className="mt-1 !text-slate-400">
          {topicName}
        </Text>
      ) : null}

      <Text variant="body2" className="mt-2 !text-slate-500">
        {questionCountText}
        {durationText ? ` · ${durationText}` : ''}
      </Text>

      <Button className="mt-4 w-full shadow-sm" disabled={starting} onClick={onStart}>
        {starting ? startingText : hasInProgress ? continueText : startText}
      </Button>
    </article>
  );
};
