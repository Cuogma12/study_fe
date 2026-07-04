'use client';

import React from 'react';
import { MaterialIcon, Text, Input, Button, TextLink } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

export const HomeRightSidebar = () => {
  const t = useTranslations('home.right_sidebar');

  return (
    <aside className="scrollbar-nice hidden min-h-0 w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-slate-200 py-6 pl-6 dark:border-slate-700 lg:flex">
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 bg-primary p-4 text-white">
          <MaterialIcon icon="smart_toy" />
          <div>
            <Text variant="body2" weight="bold">
              {t('ai_assistant')}
            </Text>
            <Text variant="caption" className="mt-0.5 block opacity-80">
              {t('online')}
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="rounded-lg rounded-tl-none bg-slate-100 p-3 dark:bg-slate-800">
            <Text variant="small" className="leading-relaxed">
              {t('ai_welcome')}
            </Text>
          </div>
          <div className="relative flex items-center">
            <Input
              className="!py-2 !pr-10 !text-xs"
              placeholder={t('ai_placeholder')}
              type="text"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 !h-8 !w-8 !p-0 !text-primary"
            >
              <MaterialIcon icon="send" size="text-lg" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Text variant="body2" weight="bold" className="mb-4 flex items-center gap-2">
          <MaterialIcon icon="trending_up" className="text-xl !text-primary" />
          {t('trending')}
        </Text>
        <div className="flex flex-wrap gap-2">
          {[
            '#OnThiTHPT',
            '#TichPhan',
            '#TiengAnhGenZ',
            '#OlymicVatLy',
            '#BaiTapKho',
            '#HocNhom',
          ].map((tag) => (
            <TextLink
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1.5 !text-xs font-medium !text-slate-600 transition-colors hover:!text-primary dark:bg-slate-800 dark:!text-slate-400"
            >
              {tag}
            </TextLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Text variant="body2" weight="bold" className="mb-4">
          {t('leaderboard')}
        </Text>
        <div className="flex flex-col gap-3">
          {[
            { rank: 1, name: 'Hoàng Nam', pts: '2.4k pts', color: 'bg-yellow-400' },
            { rank: 2, name: 'Thảo Vy', pts: '2.1k pts', color: 'bg-slate-300' },
            { rank: 3, name: 'Minh Quân', pts: '1.9k pts', color: 'bg-orange-300' },
          ].map((u) => (
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
