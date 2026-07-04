'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

export const QuestionAiSidebar = () => {
  const t = useTranslations('question_detail.ai');

  return (
    <aside className="hidden w-full lg:block lg:w-[380px] xl:w-[400px]">
      <div className="sticky top-24 flex h-[calc(100vh-120px)] flex-col rounded-xl border border-primary/20 bg-white shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-primary/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
              <MaterialIcon icon="auto_awesome" />
            </div>
            <div>
              <Text variant="body2" weight="bold">
                {t('title')}
              </Text>
              <span className="text-[10px] font-bold uppercase tracking-tight text-green-500">
                {t('online')}
              </span>
            </div>
          </div>
        </div>

        <div className="scrollbar-nice flex-1 space-y-4 overflow-y-auto p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MaterialIcon icon="smart_toy" size="text-sm" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3 text-sm dark:bg-slate-800">
              <p>{t('welcome')}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            <span className="h-px w-8 bg-primary/10" />
            <span className="text-[10px] font-medium text-slate-400">{t('suggestions')}</span>
            <span className="h-px w-8 bg-primary/10" />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled
              className="w-full rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-left text-xs font-medium text-primary opacity-70"
            >
              {t('suggestion_1')}
            </button>
            <button
              type="button"
              disabled
              className="w-full rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-left text-xs font-medium text-primary opacity-70"
            >
              {t('suggestion_2')}
            </button>
          </div>
        </div>

        <div className="p-4 pt-0">
          <div className="relative">
            <textarea
              disabled
              className="w-full resize-none rounded-xl border border-primary/10 bg-slate-50 p-3 pr-12 text-sm dark:bg-slate-800"
              placeholder={t('placeholder')}
              rows={2}
            />
            <Button
              disabled
              size="sm"
              className="absolute bottom-2 right-2 !h-8 !w-8 !p-0"
            >
              <MaterialIcon icon="send" size="text-lg" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">{t('disclaimer')}</p>
        </div>
      </div>
    </aside>
  );
};
