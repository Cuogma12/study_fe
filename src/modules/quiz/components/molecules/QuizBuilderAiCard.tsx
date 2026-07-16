import { MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizBuilderAiCardProps {
  title: string;
  description: string;
  actionText: string;
  generatingText: string;
  disabled?: boolean;
  loading?: boolean;
  onAction: () => void;
}

export const QuizBuilderAiCard = ({
  title,
  description,
  actionText,
  generatingText,
  disabled = false,
  loading = false,
  onAction,
}: QuizBuilderAiCardProps) => {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onAction}
      className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover} relative flex w-full flex-col border-dashed text-left sm:flex-row sm:items-center sm:justify-between disabled:cursor-not-allowed disabled:opacity-60`}
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
        className="mt-3 shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 !font-semibold !text-primary sm:mt-0"
      >
        {loading ? generatingText : actionText}
      </Text>
    </button>
  );
};
