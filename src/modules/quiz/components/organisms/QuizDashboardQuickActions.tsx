import { Button, MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizDashboardQuickActionsProps {
  title: string;
  createQuizText: string;
  createAiText: string;
  onCreateQuiz: () => void;
}

export const QuizDashboardQuickActions = ({
  title,
  createQuizText,
  createAiText,
  onCreateQuiz,
}: QuizDashboardQuickActionsProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Text variant="h6" className="mb-3 !font-semibold">
        {title}
      </Text>
      <div className="flex flex-col gap-3">
        <Button onClick={onCreateQuiz} className="!justify-between">
          <div className="flex items-center gap-2">
            <MaterialIcon icon="add_circle" size={18} />
            <Text as="span" variant="body2" className="!text-white !font-semibold">
              {createQuizText}
            </Text>
          </div>
          <MaterialIcon icon="arrow_forward" size={18} className="text-white" />
        </Button>
        <Button variant="outline" className="!justify-between">
          <div className="flex items-center gap-2">
            <MaterialIcon icon="psychology" size={18} />
            <Text as="span" variant="body2" className="!font-semibold">
              {createAiText}
            </Text>
          </div>
          <MaterialIcon icon="arrow_forward" size={18} />
        </Button>
      </div>
    </section>
  );
};
