'use client';

import React from 'react';
import { MaterialIcon, Text, Button, Textarea } from '@/shared/components/atoms';
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
              <Text variant="caption" className="!normal-case !text-green-500">
                {t('online')}
              </Text>
            </div>
          </div>
        </div>

        <div className="scrollbar-nice flex-1 space-y-4 overflow-y-auto p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MaterialIcon icon="smart_toy" size="text-sm" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3 dark:bg-slate-800">
              <Text variant="body2">{t('welcome')}</Text>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            <Text as="span" variant="small" className="h-px w-8 bg-primary/10" aria-hidden />
            <Text variant="caption" className="!normal-case !text-slate-400">
              {t('suggestions')}
            </Text>
            <Text as="span" variant="small" className="h-px w-8 bg-primary/10" aria-hidden />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="ghost"
              disabled
              className="!h-auto !w-full !justify-start !rounded-lg !border !border-primary/20 !bg-primary/5 !px-3 !py-2 !text-left !text-xs !font-medium !text-primary opacity-70"
            >
              {t('suggestion_1')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled
              className="!h-auto !w-full !justify-start !rounded-lg !border !border-primary/20 !bg-primary/5 !px-3 !py-2 !text-left !text-xs !font-medium !text-primary opacity-70"
            >
              {t('suggestion_2')}
            </Button>
          </div>
        </div>

        <div className="p-4 pt-0">
          <div className="relative">
            <Textarea
              disabled
              hideErrorMessage
              className="!rounded-xl !border-primary/10 !bg-slate-50 !pr-12 dark:!bg-slate-800"
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
          <Text variant="caption" className="mt-2 text-center !normal-case !text-slate-400">
            {t('disclaimer')}
          </Text>
        </div>
      </div>
    </aside>
  );
};
