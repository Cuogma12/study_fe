import { Text } from '@/shared/components/atoms';

interface QuizDashboardStateProps {
  loading: boolean;
  error: string | null;
  empty: boolean;
  loadingText: string;
  emptyText: string;
}

export const QuizDashboardState = ({
  loading,
  error,
  empty,
  loadingText,
  emptyText,
}: QuizDashboardStateProps) => {
  if (loading) {
    return (
      <Text variant="body2" className="mt-4 !text-slate-500">
        {loadingText}
      </Text>
    );
  }

  if (error) {
    return (
      <Text variant="body2" className="mt-4 !text-red-500">
        {error}
      </Text>
    );
  }

  if (empty) {
    return (
      <Text variant="body2" className="mt-4 !text-slate-500">
        {emptyText}
      </Text>
    );
  }

  return null;
};
