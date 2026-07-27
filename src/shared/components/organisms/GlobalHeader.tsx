'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { UserMenu } from './UserMenu';

const isHomePath = (pathname: string | null) => {
  if (!pathname) return false;
  return (
    /\/(vi|en)\/?$/.test(pathname) || pathname === '/' || pathname === '/vi' || pathname === '/en'
  );
};

export const GlobalHeader = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();
  const pathname = usePathname();
  const onHome = isHomePath(pathname);
  const onAskQuestion = pathname?.includes('/questions/new') ?? false;
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
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/')}
          aria-label={t('home')}
          aria-current={onHome ? 'page' : undefined}
          className={`hidden !h-10 !gap-1.5 !rounded-full !px-3 transition-all lg:inline-flex ${
            onHome
              ? '!border-sky-500 !bg-sky-500 !text-white !shadow-sm hover:!border-sky-600 hover:!bg-sky-600 dark:!border-sky-400 dark:!bg-sky-500 dark:!text-white dark:hover:!bg-sky-400'
              : '!border-sky-200 !bg-sky-50 !text-sky-700 hover:!border-sky-300 hover:!bg-sky-100 dark:!border-sky-500/40 dark:!bg-sky-500/15 dark:!text-sky-200 dark:hover:!bg-sky-500/25'
          }`}
        >
          <MaterialIcon
            icon="home"
            size="text-lg"
            className={onHome ? '!text-white' : '!text-sky-600 dark:!text-sky-300'}
          />
          <Text as="span" variant="small" className="!font-semibold !text-inherit">
            {t('home')}
          </Text>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/ai')}
          aria-label={t('ai_hub')}
          aria-current={onAi ? 'page' : undefined}
          className={`!h-10 !gap-1.5 !rounded-full !px-3 transition-all ${
            onAi
              ? '!border-violet-500 !bg-violet-500 !text-white !shadow-sm hover:!border-violet-600 hover:!bg-violet-600 dark:!border-violet-400 dark:!bg-violet-500 dark:!text-white dark:hover:!bg-violet-400'
              : '!border-violet-200 !bg-violet-50 !text-violet-700 hover:!border-violet-300 hover:!bg-violet-100 dark:!border-violet-500/40 dark:!bg-violet-500/15 dark:!text-violet-200 dark:hover:!bg-violet-500/25'
          }`}
        >
          <MaterialIcon
            icon="smart_toy"
            size="text-lg"
            className={onAi ? '!text-white' : '!text-violet-600 dark:!text-violet-300'}
          />
          <Text as="span" variant="small" className="hidden !font-semibold !text-inherit sm:inline">
            {t('ai_hub')}
          </Text>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/quiz')}
          aria-label={t('quiz')}
          aria-current={onQuiz ? 'page' : undefined}
          className={`!h-10 !gap-1.5 !rounded-full !px-3 transition-all ${
            onQuiz
              ? '!border-amber-500 !bg-amber-500 !text-white !shadow-sm hover:!border-amber-600 hover:!bg-amber-600 dark:!border-amber-400 dark:!bg-amber-500 dark:!text-white dark:hover:!bg-amber-400'
              : '!border-amber-200 !bg-amber-50 !text-amber-800 hover:!border-amber-300 hover:!bg-amber-100 dark:!border-amber-500/40 dark:!bg-amber-500/15 dark:!text-amber-200 dark:hover:!bg-amber-500/25'
          }`}
        >
          <MaterialIcon
            icon="quiz"
            size="text-lg"
            className={onQuiz ? '!text-white' : '!text-amber-600 dark:!text-amber-300'}
          />
          <Text as="span" variant="small" className="hidden !font-semibold !text-inherit sm:inline">
            {t('quiz')}
          </Text>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/questions/new')}
          aria-label={t('ask_question')}
          aria-current={onAskQuestion ? 'page' : undefined}
          className={`hidden !h-10 !gap-1.5 !rounded-full !px-3 transition-all sm:inline-flex ${
            onAskQuestion
              ? '!border-emerald-500 !bg-emerald-500 !text-white !shadow-sm hover:!border-emerald-600 hover:!bg-emerald-600 dark:!border-emerald-400 dark:!bg-emerald-500 dark:!text-white dark:hover:!bg-emerald-400'
              : '!border-emerald-200 !bg-emerald-50 !text-emerald-700 hover:!border-emerald-300 hover:!bg-emerald-100 dark:!border-emerald-500/40 dark:!bg-emerald-500/15 dark:!text-emerald-200 dark:hover:!bg-emerald-500/25'
          }`}
        >
          <MaterialIcon
            icon="edit_note"
            size="text-lg"
            className={onAskQuestion ? '!text-white' : '!text-emerald-600 dark:!text-emerald-300'}
          />
          <Text as="span" variant="small" className="hidden !font-semibold !text-inherit md:inline">
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
