'use client';

import React, { Suspense } from 'react';
import { MaterialIcon, Text, TextLink, Button } from '../atoms';
import { useTranslations } from 'next-intl';
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

export const GlobalHeader = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();

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

      <div className="flex items-center gap-4 lg:gap-6">
        <nav className="hidden items-center gap-6 lg:flex">
          <TextLink onClick={() => navigateTo('/')} className="!font-semibold">
            {t('home')}
          </TextLink>
          <TextLink
            onClick={() => navigateTo('/courses')}
            className="!font-medium !text-slate-600 dark:!text-slate-400"
          >
            {t('courses')}
          </TextLink>
          <TextLink
            onClick={() => navigateTo('/discussion')}
            className="!font-medium !text-slate-600 dark:!text-slate-400"
          >
            {t('community')}
          </TextLink>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('/quiz')}
          className="!h-10 !w-10 !p-0 sm:!h-auto sm:!w-auto sm:!gap-1.5 sm:!px-3"
          aria-label={t('quiz')}
        >
          <MaterialIcon icon="quiz" size="text-lg" />
          <Text as="span" variant="small" className="hidden !font-semibold sm:inline">
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
          <Button variant="ghost" size="sm" className="relative !h-10 !w-10 !rounded-full !p-0">
            <MaterialIcon icon="notifications" className="text-slate-600 dark:text-slate-400" />
            <Text
              as="span"
              variant="small"
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"
              aria-hidden
            />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
