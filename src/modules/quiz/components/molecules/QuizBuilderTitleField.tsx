import { Input, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizBuilderTitleFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  hint?: string;
  warning?: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const QuizBuilderTitleField = ({
  label,
  value,
  placeholder,
  hint,
  warning,
  disabled = false,
  onChange,
}: QuizBuilderTitleFieldProps) => {
  return (
    <div className="md:col-span-2">
      <Text variant="small" className="mb-2 !font-semibold !text-slate-600">
        {label}
      </Text>
      <Input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={255}
        className={quizDashboardPanel.fieldControl}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? (
        <Text variant="caption" className="mt-1.5 !text-slate-400">
          {hint}
        </Text>
      ) : null}
      {warning ? (
        <Text variant="caption" className="mt-1.5 !text-amber-600 dark:!text-amber-400">
          {warning}
        </Text>
      ) : null}
    </div>
  );
};
