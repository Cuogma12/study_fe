import { MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizFormAlertProps {
  message: string;
  className?: string;
}

export const QuizFormAlert = ({ message, className = '' }: QuizFormAlertProps) => {
  return (
    <div
      role="alert"
      className={`flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 dark:border-rose-500/30 dark:bg-rose-500/10 ${className}`.trim()}
    >
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <MaterialIcon
          icon="error_outline"
          size={20}
          className="leading-none !text-rose-600 dark:!text-rose-400"
        />
      </span>
      <Text
        as="span"
        variant="body2"
        className="min-w-0 flex-1 leading-snug !text-rose-800 dark:!text-rose-200"
      >
        {message}
      </Text>
    </div>
  );
};
