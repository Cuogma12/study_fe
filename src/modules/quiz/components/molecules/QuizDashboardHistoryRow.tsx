import { Button, Text } from '@/shared/components/atoms';

interface QuizDashboardHistoryRowProps {
  title: string;
  submittedAt: string;
  scoreText: string;
  passed: boolean;
  passText: string;
  failText: string;
  reviewText: string;
}

export const QuizDashboardHistoryRow = ({
  title,
  submittedAt,
  scoreText,
  passed,
  passText,
  failText,
  reviewText,
}: QuizDashboardHistoryRowProps) => {
  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
      <td className="px-2 py-3">
        <Text variant="body2" className="!font-medium">
          {title}
        </Text>
      </td>
      <td className="px-2 py-3">
        <Text variant="small" className="!text-slate-500">
          {submittedAt}
        </Text>
      </td>
      <td className="px-2 py-3">
        <Text variant="body2" className="!font-semibold">
          {scoreText}
        </Text>
      </td>
      <td className="px-2 py-3">
        <Text
          as="span"
          variant="small"
          className={`inline-flex rounded px-2 py-1 !font-semibold ${
            passed ? 'bg-emerald-100 !text-emerald-700' : 'bg-rose-100 !text-rose-700'
          }`}
        >
          {passed ? passText : failText}
        </Text>
      </td>
      <td className="px-2 py-3 text-right">
        <Button variant="ghost" size="sm" className="!h-8 !px-2">
          {reviewText}
        </Button>
      </td>
    </tr>
  );
};
