import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';
import { QuizAttemptListItem } from '../../types/quiz';

interface QuizHistoryItemCardProps {
  item: QuizAttemptListItem;
  scoreLabel: string;
  progressLabel: string;
  questionsLabel: string;
  submittedLabel: string;
  createdLabel: string;
  statusInProgressLabel: string;
  statusSubmittedLabel: string;
  viewResultText: string;
  continueText: string;
  onViewResult: (attemptId: string) => void;
  onContinue: (attemptId: string) => void;
}

const formatDate = (value: string | null) => {
  if (!value) {
    return '—';
  }
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
};

export const QuizHistoryItemCard = ({
  item,
  scoreLabel,
  progressLabel,
  questionsLabel,
  submittedLabel,
  createdLabel,
  statusInProgressLabel,
  statusSubmittedLabel,
  viewResultText,
  continueText,
  onViewResult,
  onContinue,
}: QuizHistoryItemCardProps) => {
  const topicLabel = item.topic_name || '—';
  const isInProgress = item.status === 'in_progress';
  const statusLabel = isInProgress ? statusInProgressLabel : statusSubmittedLabel;

  return (
    <article className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            <Text
              as="span"
              variant="small"
              className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 !text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:!text-slate-300"
            >
              {item.subject_name}
            </Text>
            <Text
              as="span"
              variant="small"
              className={`rounded-full border px-2.5 py-1 ${
                isInProgress
                  ? 'border-amber-200 bg-amber-50 !text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:!text-amber-300'
                  : 'border-emerald-200 bg-emerald-50 !text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:!text-emerald-300'
              }`}
            >
              {statusLabel}
            </Text>
            {!isInProgress && item.score != null ? (
              <Text
                as="span"
                variant="small"
                className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 !text-primary"
              >
                {scoreLabel}: {item.score}
              </Text>
            ) : null}
          </div>

          <Text variant="body1" className="!font-semibold">
            {topicLabel}
          </Text>

          {isInProgress ? (
            <Text variant="body2" className="mt-2 !text-slate-500">
              {progressLabel}: {item.answered_count}/{item.total_questions}
            </Text>
          ) : (
            <Text variant="body2" className="mt-2 !text-slate-500">
              {questionsLabel}: {item.correct_count}/{item.total_questions}
            </Text>
          )}

          <Text variant="caption" className="mt-1 !text-slate-400">
            {isInProgress
              ? `${createdLabel}: ${formatDate(item.updated_at ?? item.created_at)}`
              : `${submittedLabel}: ${formatDate(item.submitted_at)}`}
          </Text>
        </div>

        {isInProgress ? (
          <Button
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={() => onContinue(item.attempt_id)}
          >
            <MaterialIcon icon="play_arrow" size="text-base" />
            {continueText}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={() => onViewResult(item.attempt_id)}
          >
            <MaterialIcon icon="visibility" size="text-base" />
            {viewResultText}
          </Button>
        )}
      </div>
    </article>
  );
};
