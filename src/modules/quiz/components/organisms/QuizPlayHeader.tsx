'use client';

import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';

interface QuizPlayHeaderProps {
  examTitle: string;
  timeLabel: string;
  onExit: () => void;
}

export const QuizPlayHeader = ({ examTitle, timeLabel, onExit }: QuizPlayHeaderProps) => {
  const tCommon = useTranslations('common');
  const tPlay = useTranslations('quiz.play');

  return (
    <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center border-b border-slate-200 bg-[#fcf8ff] px-4 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:px-8">
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

      <div className="hidden shrink-0 text-right sm:block">
        <Text variant="caption" className="!text-xs !text-slate-500">
          {examTitle}
        </Text>
        <Text variant="body2" className="!font-bold !text-primary">
          {timeLabel}
        </Text>
      </div>
    </header>
  );
};
