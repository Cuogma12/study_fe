'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

export const GlobalBottomNav = () => {
  const t = useTranslations('home.bottom_nav');
  const { navigateTo } = useAppNavigation();

  const items = [
    { path: '/', icon: 'home', label: t('home'), active: true },
    { path: '/courses', icon: 'book', label: t('courses'), active: false },
    { path: '/discussion', icon: 'forum', label: t('discussion'), active: false },
    { path: '/profile', icon: 'person', label: t('profile'), active: false },
  ] as const;

  return (
    <div className="z-50 flex w-full shrink-0 justify-around border-t border-slate-200 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900 lg:hidden">
      {items.map((item) => (
        <Button
          key={item.path}
          type="button"
          variant="ghost"
          onClick={() => navigateTo(item.path)}
          className={`!h-auto !min-w-[64px] !flex-col !gap-0.5 !rounded-xl !px-3 !py-2 !font-normal ${
            item.active
              ? '!text-primary'
              : '!text-slate-400 hover:!bg-slate-100 hover:!text-primary dark:hover:!bg-slate-800'
          }`}
        >
          <MaterialIcon icon={item.icon} />
          <Text variant="caption" weight="medium" className="!text-inherit">
            {item.label}
          </Text>
        </Button>
      ))}
    </div>
  );
};
