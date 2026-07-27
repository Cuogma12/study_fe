'use client';

import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';

interface QuizPlayHeaderProps {
  examTitle: string;
  examMeta?: string | null;
  timeLabel: string;
  onExit: () => void;
}

export const QuizPlayHeader = ({
  examTitle,
  examMeta,
  timeLabel,
  onExit,
}: QuizPlayHeaderProps) => {
  const tCommon = useTranslations('common');
  const tPlay = useTranslations('quiz.play');

  return (
    <header className="fixed left-0 top-0 z-50 flex min-h-16 w-full items-center border-b border-slate-200 bg-[#fcf8ff] px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label={tPlay('exit_aria')}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
        <Text variant="h4" className="truncate !text-xl !font-bold !text-primary">
          {tCommon('app_name')}
        </Text>
      </div>

      <div className="hidden min-w-0 max-w-[55%] shrink text-right sm:block">
        <Text
          variant="caption"
          className="block truncate !text-xs !font-semibold !text-slate-700 dark:!text-slate-200"
        >
          {examTitle}
        </Text>
        {examMeta ? (
          <Text
            variant="caption"
            className="mt-0.5 block truncate !text-[11px] !leading-tight !text-slate-400 dark:!text-slate-500"
          >
            {examMeta}
          </Text>
        ) : null}
        <Text variant="body2" className="!font-bold !text-primary">
          {timeLabel}
        </Text>
      </div>
    </header>
  );
};
