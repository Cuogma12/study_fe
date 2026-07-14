'use client';

import React from 'react';
import { MaterialIcon, Text, TextLink } from '@/shared/components/atoms';
import { useHomeRightSidebar } from '../../hooks/useHomeRightSidebar';
import { HomeAiAssistantCard } from '../molecules/HomeAiAssistantCard';

const TRENDING_TAGS = [
  '#OnThiTHPT',
  '#TichPhan',
  '#TiengAnhGenZ',
  '#OlymicVatLy',
  '#BaiTapKho',
  '#HocNhom',
] as const;

const LEADERBOARD = [
  { rank: 1, name: 'Hoàng Nam', pts: '2.4k pts', color: 'bg-yellow-400' },
  { rank: 2, name: 'Thảo Vy', pts: '2.1k pts', color: 'bg-slate-300' },
  { rank: 3, name: 'Minh Quân', pts: '1.9k pts', color: 'bg-orange-300' },
] as const;

export const HomeRightSidebar = () => {
  const { t, openAiHub, openTutor } = useHomeRightSidebar();

  return (
    <aside className="scrollbar-nice hidden min-h-0 w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-slate-200 py-6 pl-4 pr-4 dark:border-slate-700 lg:flex">
      <HomeAiAssistantCard
        title={t('ai_assistant')}
        onlineLabel={t('online')}
        welcome={t('ai_welcome')}
        openHubLabel={t('open_hub')}
        openTutorLabel={t('open_tutor')}
        onOpenHub={openAiHub}
        onOpenTutor={openTutor}
      />

      <div className="flex shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Text variant="body2" weight="bold" className="mb-4 flex items-center gap-2">
          <MaterialIcon icon="trending_up" className="text-xl !text-primary" />
          {t('trending')}
        </Text>
        <div className="flex flex-wrap gap-2">
          {TRENDING_TAGS.map((tag) => (
            <TextLink
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1.5 !text-xs font-medium !text-slate-600 transition-colors hover:!text-primary dark:bg-slate-800 dark:!text-slate-400"
            >
              {tag}
            </TextLink>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Text variant="body2" weight="bold" className="mb-4">
          {t('leaderboard')}
        </Text>
        <div className="flex flex-col gap-3">
          {LEADERBOARD.map((u) => (
            <div key={u.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Text variant="small" weight="bold" className="w-4 !text-slate-400">
                  {u.rank}
                </Text>
                <div className={`h-6 w-6 rounded-full ${u.color}`} />
                <Text variant="small" weight="medium">
                  {u.name}
                </Text>
              </div>
              <Text variant="small" weight="bold" className="!text-primary">
                {u.pts}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
