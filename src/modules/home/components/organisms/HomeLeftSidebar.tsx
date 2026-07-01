'use client';

import React from 'react';
import { MaterialIcon, Text, Button, TextLink } from '@/shared/components/atoms';
import { Subject } from '@/shared/services/subject.service';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

interface HomeLeftSidebarProps {
  subjects: Subject[];
}

export const HomeLeftSidebar = ({ subjects }: HomeLeftSidebarProps) => {
  const t = useTranslations('home.sidebar');
  const { navigateTo } = useAppNavigation();

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-8 xl:flex">
      <div className="flex flex-col gap-4">
        <div className="px-2">
          <Text variant="caption" className="mb-4 block text-slate-400">
            {t('grades')}
          </Text>
          <div className="flex flex-col gap-1">
            <Button variant="secondary" className="!h-auto !justify-between !px-3 !py-2">
              <span>{t('grade_12')}</span>
              <MaterialIcon icon="check_circle" size="text-sm" />
            </Button>
            <Button variant="ghost" className="!h-auto !justify-start !px-3 !py-2 !font-normal">
              {t('grade_11')}
            </Button>
            <Button variant="ghost" className="!h-auto !justify-start !px-3 !py-2 !font-normal">
              {t('grade_10')}
            </Button>
          </div>
        </div>

        <div className="px-2">
          <Text variant="caption" className="mb-4 block text-slate-400">
            {t('subjects')}
          </Text>
          <div className="flex flex-col gap-1">
            {subjects.map((subject) => (
              <TextLink
                key={subject.id}
                onClick={() => navigateTo(`/subjects/` + subject.slug)}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 !font-normal !text-slate-900 transition-all hover:bg-slate-100 hover:!no-underline dark:!text-slate-100 dark:hover:bg-slate-800"
              >
                <MaterialIcon
                  icon={subject.icon_url || 'book'}
                  className="!text-slate-400 group-hover:!text-primary"
                />
                <Text variant="body2" weight="medium">
                  {subject.name}
                </Text>
              </TextLink>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto rounded-xl bg-gradient-to-br from-primary to-indigo-600 p-4 text-white shadow-lg">
        <Text variant="caption" className="mb-1 block !text-white/80">
          {t('upgrade_title')}
        </Text>
        <Text variant="body2" weight="semibold" className="mb-3 block !text-white">
          {t('upgrade_desc')}
        </Text>
        <Button
          variant="outline"
          className="w-full !border-white !bg-white !text-primary hover:!bg-slate-50"
        >
          {t('view_pro')}
        </Button>
      </div>
    </aside>
  );
};
