'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

const isHomePath = (pathname: string | null) => {
  if (!pathname) return false;
  return /\/(vi|en)\/?$/.test(pathname) || pathname === '/' || pathname === '/vi' || pathname === '/en';
};

export const GlobalBottomNav = () => {
  const t = useTranslations('home.bottom_nav');
  const { navigateTo } = useAppNavigation();
  const pathname = usePathname();

  const items = [
    {
      path: '/',
      icon: 'home' as const,
      label: t('home'),
      active: isHomePath(pathname),
      activeClass: '!text-primary',
    },
    {
      path: '/quiz',
      icon: 'quiz' as const,
      label: t('quiz'),
      active: pathname?.includes('/quiz') ?? false,
      activeClass: '!text-amber-600',
    },
    {
      path: '/ai',
      icon: 'smart_toy' as const,
      label: t('ai_hub'),
      active: pathname?.includes('/ai') ?? false,
      activeClass: '!text-violet-600',
    },
    {
      path: '/profile',
      icon: 'person' as const,
      label: t('profile'),
      active: pathname?.includes('/profile') ?? false,
      activeClass: '!text-primary',
    },
  ];

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
              ? item.activeClass
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
