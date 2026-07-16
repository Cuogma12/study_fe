'use client';

import React, { Suspense } from 'react';
import { MaterialIcon, Text, TextLink, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { UserMenu } from './UserMenu';
import { HomeSearchField } from '../molecules/HomeSearchField';

const HeaderSearchFallback = () => {
  const t = useTranslations('home.header');
  return (
    <div className="hidden min-w-80 md:block">
      <div className="h-10 rounded-full bg-slate-100 dark:bg-slate-800" aria-hidden />
      <Text as="span" variant="small" className="sr-only">
        {t('search_placeholder')}
      </Text>
    </div>
  );
};

const isHomePath = (pathname: string | null) => {
  if (!pathname) return false;
  return /\/(vi|en)\/?$/.test(pathname) || pathname === '/' || pathname === '/vi' || pathname === '/en';
};

export const GlobalHeader = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();
  const pathname = usePathname();
  const onHome = isHomePath(pathname);
  const onQuiz = pathname?.includes('/quiz') ?? false;
  const onAi = pathname?.includes('/ai') ?? false;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-6 shadow-sm dark:border-slate-700 dark:bg-background-dark lg:px-10">
      <div className="flex items-center gap-8">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigateTo('/')}
          className="!h-auto !gap-3 !rounded-lg !p-0 hover:!opacity-80"
        >
          <div className="rounded-lg bg-primary p-1.5 transition-transform group-hover:scale-105">
            <MaterialIcon icon="database" className="text-2xl text-white" />
          </div>
          <Text variant="h4" className="!text-primary">
            {t('brand_name')}
          </Text>
        </Button>

        <div className="hidden min-w-80 flex-col md:flex">
          <Suspense fallback={<HeaderSearchFallback />}>
            <HomeSearchField />
          </Suspense>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <nav className="hidden items-center gap-6 lg:flex">
          <TextLink
            onClick={() => navigateTo('/')}
            className={onHome ? '!font-semibold' : '!font-medium !text-slate-600 dark:!text-slate-400'}
          >
            {t('home')}
          </TextLink>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/ai')}
          aria-label={t('ai_hub')}
          className={`!h-10 !gap-1.5 !rounded-full !border-violet-200 !bg-violet-50 !px-3 !text-violet-700 transition-all hover:!border-violet-300 hover:!bg-violet-100 hover:!shadow-sm dark:!border-violet-500/40 dark:!bg-violet-500/15 dark:!text-violet-200 dark:hover:!bg-violet-500/25 ${
            onAi ? '!border-violet-400 !shadow-md ring-2 ring-violet-200 dark:!border-violet-400 dark:ring-violet-500/30' : ''
          }`}
        >
          <MaterialIcon icon="smart_toy" size="text-lg" className="!text-violet-600 dark:!text-violet-300" />
          <Text as="span" variant="small" className="hidden !font-semibold !text-inherit sm:inline">
            {t('ai_hub')}
          </Text>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/quiz')}
          aria-label={t('quiz')}
          className={`!h-10 !gap-1.5 !rounded-full !border-amber-200 !bg-amber-50 !px-3 !text-amber-800 transition-all hover:!border-amber-300 hover:!bg-amber-100 hover:!shadow-sm dark:!border-amber-500/40 dark:!bg-amber-500/15 dark:!text-amber-200 dark:hover:!bg-amber-500/25 ${
            onQuiz ? '!border-amber-400 !shadow-md ring-2 ring-amber-200 dark:!border-amber-400 dark:ring-amber-500/30' : ''
          }`}
        >
          <MaterialIcon icon="quiz" size="text-lg" className="!text-amber-600 dark:!text-amber-300" />
          <Text as="span" variant="small" className="hidden !font-semibold !text-inherit sm:inline">
            {t('quiz')}
          </Text>
        </Button>

        <Button
          size="sm"
          onClick={() => navigateTo('/questions/new')}
          className="hidden !gap-1.5 sm:inline-flex"
        >
          <MaterialIcon icon="edit_note" size="text-lg" className="text-white" />
          <Text as="span" variant="small" className="hidden !font-semibold !text-white md:inline">
            {t('ask_question')}
          </Text>
        </Button>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-slate-700 lg:pl-6">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
