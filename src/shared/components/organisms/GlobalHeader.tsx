'use client';

import React from 'react';
import { MaterialIcon, Text, TextLink, Input, Button } from '../atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

export const GlobalHeader = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <MaterialIcon icon="database" className="text-white text-2xl" />
          </div>
          <Text variant="h4" className="text-primary">{t('brand_name')}</Text>
        </div>

        <div className="hidden md:flex flex-col min-w-80">
          <Input 
            icon={<MaterialIcon icon="search" />}
            className="!py-2 !rounded-full !bg-slate-100 dark:!bg-slate-800 !border-none !text-sm"
            placeholder={t('search_placeholder')} 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <nav className="hidden lg:flex items-center gap-6">
          <TextLink onClick={() => navigateTo('/')} className="!font-semibold">{t('home')}</TextLink>
          <TextLink onClick={() => navigateTo('/courses')} className="!font-medium !text-slate-600 dark:!text-slate-400">{t('courses')}</TextLink>
          <TextLink onClick={() => navigateTo('/discussion')} className="!font-medium !text-slate-600 dark:!text-slate-400">{t('community')}</TextLink>
        </nav>

        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 lg:pl-6">
          <Button variant="ghost" size="sm" className="relative !w-10 !h-10 !rounded-full !p-0">
            <MaterialIcon icon="notifications" className="text-slate-600 dark:text-slate-400" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <div onClick={() => navigateTo('/profile')} className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30 cursor-pointer hover:opacity-90">
            <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTmVQg321V-k37xBPf85rg4_GS7nkLtXKkEz-m-7OQGAI2UDVQCkYgA4PJa2SOv76jeeS8fkJKZLnjpjs3alszcjn9gXXBWew8fEVlOQiYqp93aCh4C-5H__17i7YdCOzY7djVXWRkh-6bpYDEiIg7zagVhIZR3acoCXAsIK-L7TdzFAr0xHV8xiCSxAak98G6PV-Z-5Q_tQHdMhXi5v8DGzd3EUwzeFEtt8hf78WyziyWdqj6yn8oSowMlZ1VFqgnbEoy9dju5fA" alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};
