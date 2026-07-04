'use client';

import React from 'react';
import { MaterialIcon, Text, TextLink, Input, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { UserMenu } from './UserMenu';

export const GlobalHeader = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm dark:border-slate-700 dark:bg-background-dark lg:px-10">
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="flex cursor-pointer items-center gap-3 rounded-lg transition-opacity hover:opacity-80"
        >
          <div className="rounded-lg bg-primary p-1.5 transition-transform group-hover:scale-105">
            <MaterialIcon icon="database" className="text-2xl text-white" />
          </div>
          <Text variant="h4" className="text-primary">
            {t('brand_name')}
          </Text>
        </button>

        <div className="hidden min-w-80 flex-col md:flex">
          <Input
            icon={<MaterialIcon icon="search" />}
            className="!rounded-full !border-none !bg-slate-100 !py-2 !text-sm dark:!bg-slate-800"
            placeholder={t('search_placeholder')}
            type="text"
          />
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
          size="sm"
          onClick={() => navigateTo('/questions/new')}
          className="hidden !gap-1.5 sm:inline-flex"
        >
          <MaterialIcon icon="edit_note" size="text-lg" className="text-white" />
          <span className="hidden md:inline">{t('ask_question')}</span>
        </Button>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-slate-700 lg:pl-6">
          <Button variant="ghost" size="sm" className="relative !h-10 !w-10 !rounded-full !p-0">
            <MaterialIcon icon="notifications" className="text-slate-600 dark:text-slate-400" />
            <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
