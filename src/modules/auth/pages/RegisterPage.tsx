'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RegisterForm } from '@/modules/auth/components/organisms/RegisterForm';
import { SchoolIcon } from '@/shared/components/atoms/icon';
import { Button, Text } from '@/shared/components/atoms';

export const RegisterPage = () => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-background-dark/50 md:px-10 backdrop-blur-md">
          <div className="flex items-center gap-4 text-primary">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <SchoolIcon size={20} className="text-primary" />
            </div>
            <Text variant="h6" weight="bold" className="tracking-[-0.015em] !text-slate-900 dark:!text-white">
              {t('common.app_name')}
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-slate-500 dark:text-slate-400 md:block">
              {t('auth.register.already_account')}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="!h-10 !px-4 !font-bold"
              onClick={() => router.push('/login')}
            >
              {t('auth.register.login_link')}
            </Button>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-6 py-12">
          <RegisterForm />
        </main>

        {/* Footer Decor */}
        <footer className="mt-auto flex justify-center py-8 opacity-50">
          <div className="flex gap-6 text-xs font-medium text-slate-400">
            <span>© 2024 {t('common.app_name')} Education Inc.</span>
            <button className="hover:text-primary transition-colors">Support</button>
            <button className="hover:text-primary transition-colors">Privacy</button>
          </div>
        </footer>
      </div>
    </div>
  );
};
