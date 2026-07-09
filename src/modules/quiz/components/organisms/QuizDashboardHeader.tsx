import { Button, Text } from '@/shared/components/atoms';

interface QuizDashboardHeaderProps {
  title: string;
  description: string;
  greetingText?: string;
  createActionText: string;
  hideCreateOnDesktop?: boolean;
  onCreate: () => void;
}

export const QuizDashboardHeader = ({
  title,
  description,
  greetingText,
  createActionText,
  hideCreateOnDesktop = false,
  onCreate,
}: QuizDashboardHeaderProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
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
      <Button onClick={onCreate} className={hideCreateOnDesktop ? 'lg:hidden' : ''}>
        {createActionText}
      </Button>
    </div>
  );
};
