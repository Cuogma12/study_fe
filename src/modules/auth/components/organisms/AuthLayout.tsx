'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SchoolIcon } from '@/shared/components/atoms/icon';
import { Button, Image, Text } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const t = useTranslations();
  const { navigateTo } = useAppNavigation();

  const goHome = () => navigateTo('/');

  const brandButton = (
    <Button
      type="button"
      variant="ghost"
      onClick={goHome}
      aria-label={t('common.app_name')}
      className="!h-auto !gap-2 !rounded-lg !p-0 hover:!bg-transparent hover:!opacity-80"
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
        <SchoolIcon size={20} />
      </div>
      <Text variant="h3">{t('common.app_name')}</Text>
    </Button>
  );

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Illustration & Branding */}
      <div className="relative hidden flex-col overflow-hidden bg-primary/10 p-12 lg:flex lg:w-1/2">
        <div className="relative z-20 shrink-0">{brandButton}</div>
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <div className="max-w-[300px] text-center">
            <div className="mb-8 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                alt="Students studying"
                className="h-[300px] w-[300px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwkdE7n8KCDbKjA0AZ1QpFOHJXoxRCxFbEv2haTrDHuyaPprsn_1NNJr8yR4X6IEq1O897WF3KslTU1RtXhfawOquo6FtxUfZv3m_WU-L91Jv357MqWvgYP-eQNrsYTqDXP5Ew1vjIAbI66qn10oeP_3rpz-pmTQ8fKMZHVXlnjNrLsqV2CMhpSwCUdWd5bMhJAVvT9hc4j3g04Imh52xtIzhdngAqALWTg7gNz9pspQOpQ8sbKu0c_NbyFciVE-Q4vOxtr9Lezqo"
              />
            </div>
            <Text variant="h2" className="mb-4">
              {t('auth.layout.title')}
            </Text>
            <Text variant="body1" className="text-lg !text-slate-600 dark:!text-slate-400">
              {t('auth.layout.description')}
            </Text>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      {/* Right Side: Dynamic Content (Login, Register, etc.) */}
      <div className="flex w-full flex-col bg-white dark:bg-background-dark lg:w-1/2">
        <div className="flex items-center px-6 pt-6 sm:px-12 lg:hidden">{brandButton}</div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">{children}</div>
      </div>
    </div>
  );
};
