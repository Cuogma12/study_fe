'use client';

import { MaterialIcon, Text, Button } from '@/shared/components/atoms';

interface HomeAiAssistantCardProps {
  title: string;
  onlineLabel: string;
  welcome: string;
  openHubLabel: string;
  openTutorLabel: string;
  onOpenHub: () => void;
  onOpenTutor: () => void;
}

export const HomeAiAssistantCard = ({
  title,
  onlineLabel,
  welcome,
  openHubLabel,
  openTutorLabel,
  onOpenHub,
  onOpenTutor,
}: HomeAiAssistantCardProps) => {
  return (
    <div className="flex w-full shrink-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 rounded-t-xl bg-primary p-4 text-white">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <MaterialIcon icon="auto_awesome" />
        </div>
        <div className="min-w-0">
          <Text variant="body2" weight="bold" className="!text-white">
            {title}
          </Text>
          <Text
            variant="caption"
            className="mt-0.5 flex items-center gap-1 !normal-case !tracking-normal opacity-90"
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-300" />
            {onlineLabel}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="rounded-lg rounded-tl-none bg-slate-100 p-3 dark:bg-slate-800">
          <Text variant="small" className="leading-relaxed !text-slate-700 dark:!text-slate-200">
            {welcome}
          </Text>
        </div>

        <Button
          type="button"
          size="sm"
          className="!h-10 !w-full !shrink-0 !justify-center !gap-2 !px-3"
          onClick={onOpenTutor}
        >
          <MaterialIcon icon="school" size={18} className="!text-[18px]" />
          <span className="truncate">{openTutorLabel}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="!h-10 !w-full !shrink-0 !justify-center !gap-2 !px-3"
          onClick={onOpenHub}
        >
          <MaterialIcon icon="apps" size={18} className="!text-[18px]" />
          <span className="truncate">{openHubLabel}</span>
        </Button>
      </div>
    </div>
  );
};
