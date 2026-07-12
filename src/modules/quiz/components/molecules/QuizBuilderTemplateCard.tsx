import { MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizBuilderTemplateCardProps {
  title: string;
  description: string;
  metaText: string;
  icon: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export const QuizBuilderTemplateCard = ({
  title,
  description,
  metaText,
  icon,
  selected,
  disabled = false,
  onSelect,
}: QuizBuilderTemplateCardProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover} flex w-full flex-col text-left transition-all ${
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MaterialIcon icon={icon} size="text-xl" />
        </div>
        {selected ? (
          <MaterialIcon icon="check_circle" className="!text-primary" size="text-xl" />
        ) : null}
      </div>
      <Text variant="body1" className="!font-semibold">
        {title}
      </Text>
      <Text variant="body2" className="mt-1 line-clamp-2 !text-slate-500">
        {description}
      </Text>
      <Text variant="caption" className="mt-2 !text-slate-400">
        {metaText}
      </Text>
    </button>
  );
};
