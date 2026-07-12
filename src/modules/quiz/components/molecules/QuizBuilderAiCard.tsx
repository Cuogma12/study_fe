import { MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizBuilderAiCardProps {
  title: string;
  description: string;
  badgeText: string;
}

export const QuizBuilderAiCard = ({ title, description, badgeText }: QuizBuilderAiCardProps) => {
  return (
    <div
      className={`${quizDashboardPanel.shell} relative flex flex-col border-dashed opacity-90 sm:flex-row sm:items-center sm:justify-between`}
      aria-disabled
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
          <MaterialIcon icon="auto_awesome" size="text-xl" />
        </div>
        <div className="min-w-0">
          <Text variant="body1" className="!font-semibold">
            {title}
          </Text>
          <Text variant="body2" className="mt-1 !text-slate-500">
            {description}
          </Text>
        </div>
      </div>
      <Text
        as="span"
        variant="small"
        className="mt-3 shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 !font-semibold !text-amber-700 sm:mt-0 dark:border-amber-900/40 dark:bg-amber-950/30 dark:!text-amber-300"
      >
        {badgeText}
      </Text>
    </div>
  );
};
