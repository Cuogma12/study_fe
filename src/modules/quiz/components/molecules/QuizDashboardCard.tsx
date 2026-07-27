import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';
import { QuizSetType } from '../../types/quiz';

const SET_TYPE_VISUAL: Record<
  QuizSetType,
  { icon: string; banner: string; iconWrap: string; iconColor: string }
> = {
  midterm: {
    icon: 'assignment',
    banner:
      'border-sky-100 bg-gradient-to-br from-sky-50 via-sky-100/80 to-indigo-50 dark:border-sky-500/20 dark:from-sky-950/40 dark:via-sky-900/20 dark:to-indigo-950/30',
    iconWrap: 'bg-white/90 shadow-sm ring-1 ring-sky-200/80 dark:bg-sky-950/50 dark:ring-sky-500/30',
    iconColor: 'text-sky-600 dark:text-sky-300',
  },
  final: {
    icon: 'menu_book',
    banner:
      'border-violet-100 bg-gradient-to-br from-violet-50 via-violet-100/70 to-fuchsia-50 dark:border-violet-500/20 dark:from-violet-950/40 dark:via-violet-900/20 dark:to-fuchsia-950/30',
    iconWrap:
      'bg-white/90 shadow-sm ring-1 ring-violet-200/80 dark:bg-violet-950/50 dark:ring-violet-500/30',
    iconColor: 'text-violet-600 dark:text-violet-300',
  },
  thpt_qg: {
    icon: 'workspace_premium',
    banner:
      'border-amber-100 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:border-amber-500/20 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-rose-950/30',
    iconWrap:
      'bg-white/90 shadow-sm ring-1 ring-amber-200/80 dark:bg-amber-950/50 dark:ring-amber-500/30',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
  university_prep: {
    icon: 'school',
    banner:
      'border-emerald-100 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-cyan-950/30',
    iconWrap:
      'bg-white/90 shadow-sm ring-1 ring-emerald-200/80 dark:bg-emerald-950/50 dark:ring-emerald-500/30',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
  },
};

interface QuizDashboardCardProps {
  title: string;
  subjectName: string;
  topicName: string;
  setType: QuizSetType;
  setTypeLabel: string;
  gradeText: string;
  questionCountText: string;
  durationText: string | null;
  startText: string;
  continueText: string;
  retryText: string;
  completedText: string;
  scoreText: (score: number) => string;
  startingText: string;
  hasInProgress: boolean;
  hasSubmitted: boolean;
  latestScore: number | null;
  starting: boolean;
  onStart: () => void;
}

export const QuizDashboardCard = ({
  title,
  subjectName,
  topicName,
  setType,
  setTypeLabel,
  gradeText,
  questionCountText,
  durationText,
  startText,
  continueText,
  retryText,
  completedText,
  scoreText,
  startingText,
  hasInProgress,
  hasSubmitted,
  latestScore,
  starting,
  onStart,
}: QuizDashboardCardProps) => {
  const visual = SET_TYPE_VISUAL[setType] ?? SET_TYPE_VISUAL.midterm;

  return (
    <article
      className={`${quizDashboardPanel.shell} ${quizDashboardPanel.shellHover} flex min-w-0 flex-col`}
    >
      <div
        className={`relative mb-3 flex h-24 items-center justify-center overflow-hidden rounded-xl border ${visual.banner}`}
      >
        <div
          className={`relative z-0 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${visual.iconWrap}`}
        >
          <MaterialIcon
            icon={visual.icon}
            size={34}
            className={`${visual.iconColor} !leading-none`}
          />
        </div>

        {hasSubmitted ? (
          <Text
            as="span"
            variant="small"
            className="pointer-events-none absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 !font-semibold !text-emerald-700 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:!text-emerald-300"
          >
            <MaterialIcon icon="check_circle" size={14} />
            {completedText}
          </Text>
        ) : null}
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 !text-primary"
        >
          {setTypeLabel}
        </Text>
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 !text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:!text-slate-300"
        >
          {subjectName}
        </Text>
        <Text
          as="span"
          variant="small"
          className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 !text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:!text-slate-300"
        >
          {gradeText}
        </Text>
      </div>

      <Text variant="body1" className="line-clamp-2 !font-semibold">
        {title}
      </Text>

      {topicName ? (
        <Text variant="caption" className="mt-1 !text-slate-400">
          {topicName}
        </Text>
      ) : null}

      <Text variant="body2" className="mt-2 !text-slate-500">
        {questionCountText}
        {durationText ? ` · ${durationText}` : ''}
      </Text>

      {hasSubmitted && latestScore != null ? (
        <Text variant="small" className="mt-2 !font-medium !text-emerald-600 dark:!text-emerald-400">
          {scoreText(latestScore)}
        </Text>
      ) : null}

      <div className="mt-auto w-full min-w-0 pt-4">
        <Button
          className="w-full min-w-0 max-w-full !px-4 shadow-sm"
          disabled={starting}
          onClick={onStart}
        >
          {starting
            ? startingText
            : hasInProgress
              ? continueText
              : hasSubmitted
                ? retryText
                : startText}
        </Button>
      </div>
    </article>
  );
};
