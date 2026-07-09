import { Button, Text } from '@/shared/components/atoms';
import { QuizDashboardHistoryRow } from '../molecules/QuizDashboardHistoryRow';

interface HistoryItem {
  title: string;
  submittedAt: string;
  scoreText: string;
  passed: boolean;
}

interface QuizDashboardHistoryTableProps {
  title: string;
  viewAllText: string;
  columns: {
    quiz: string;
    time: string;
    score: string;
    status: string;
    action: string;
  };
  passText: string;
  failText: string;
  reviewText: string;
  items: HistoryItem[];
}

export const QuizDashboardHistoryTable = ({
  title,
  viewAllText,
  columns,
  passText,
  failText,
  reviewText,
  items,
}: QuizDashboardHistoryTableProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Text variant="h6" className="!font-semibold">
          {title}
        </Text>
        <Button variant="ghost" size="sm" className="!h-8 !px-2">
          {viewAllText}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-2 py-2 text-left">
                <Text variant="small" className="!text-slate-500">
                  {columns.quiz}
                </Text>
              </th>
              <th className="px-2 py-2 text-left">
                <Text variant="small" className="!text-slate-500">
                  {columns.time}
                </Text>
              </th>
              <th className="px-2 py-2 text-left">
                <Text variant="small" className="!text-slate-500">
                  {columns.score}
                </Text>
              </th>
              <th className="px-2 py-2 text-left">
                <Text variant="small" className="!text-slate-500">
                  {columns.status}
                </Text>
              </th>
              <th className="px-2 py-2 text-right">
                <Text variant="small" className="!text-slate-500">
                  {columns.action}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <QuizDashboardHistoryRow
                key={`${item.title}-${item.submittedAt}`}
                title={item.title}
                submittedAt={item.submittedAt}
                scoreText={item.scoreText}
                passed={item.passed}
                passText={passText}
                failText={failText}
                reviewText={reviewText}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
