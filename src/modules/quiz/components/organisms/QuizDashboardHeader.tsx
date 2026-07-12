import { Text } from '@/shared/components/atoms';

interface QuizDashboardHeaderProps {
  title: string;
  description: string;
  greetingText?: string;
}

export const QuizDashboardHeader = ({
  title,
  description,
  greetingText,
}: QuizDashboardHeaderProps) => {
  return (
    <div className="mb-4">
      {greetingText ? (
        <Text variant="body1" className="!font-semibold !text-slate-700">
          {greetingText}
        </Text>
      ) : null}
      <Text variant="h3" className="!font-black">
        {title}
      </Text>
      <Text variant="body2" className="mt-1 !text-slate-500">
        {description}
      </Text>
    </div>
  );
};
