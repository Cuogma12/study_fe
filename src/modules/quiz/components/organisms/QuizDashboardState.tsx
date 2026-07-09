import { Text } from '@/shared/components/atoms';
import { QuizFormAlert } from '../molecules/QuizFormAlert';

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
    return <QuizFormAlert message={error} className="mt-4" />;
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
