'use client';

import React from 'react';
import { MaterialIcon, Text } from '../atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

export const GlobalBottomNav = () => {
  const t = useTranslations('home.bottom_nav');
  const { navigateTo } = useAppNavigation();

  return (
    <div className="lg:hidden sticky bottom-0 z-50 flex w-full border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 justify-around">
      <div onClick={() => navigateTo('/')} className="flex flex-col items-center gap-1 text-primary hover:no-underline cursor-pointer">
        <MaterialIcon icon="home" />
        <Text variant="caption">{t('home')}</Text>
      </div>
      <div onClick={() => navigateTo('/courses')} className="flex flex-col items-center gap-1 text-slate-400 hover:no-underline cursor-pointer">
        <MaterialIcon icon="book" />
        <Text variant="caption" weight="medium">{t('courses')}</Text>
      </div>
      <div onClick={() => navigateTo('/discussion')} className="flex flex-col items-center gap-1 text-slate-400 hover:no-underline cursor-pointer">
        <MaterialIcon icon="forum" />
        <Text variant="caption" weight="medium">{t('discussion')}</Text>
      </div>
      <div onClick={() => navigateTo('/profile')} className="flex flex-col items-center gap-1 text-slate-400 hover:no-underline cursor-pointer">
        <MaterialIcon icon="person" />
        <Text variant="caption" weight="medium">{t('profile')}</Text>
      </div>
    </div>
  );
};
