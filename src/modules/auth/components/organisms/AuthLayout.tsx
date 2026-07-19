'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SchoolIcon } from '@/shared/components/atoms/icon';
import { Image, Text } from '@/shared/components/atoms';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Illustration & Branding */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-primary/10 p-12 lg:flex lg:w-1/2">
        <div className="absolute left-10 top-10 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
            <SchoolIcon size={20} />
          </div>
          <Text variant="h3">{t('common.app_name')}</Text>
        </div>
        <div className="z-10 max-w-[300px] text-center">
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
        {/* Abstract Background Shapes */}
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      {/* Right Side: Dynamic Content (Login, Register, etc.) */}
      <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-background-dark sm:p-12 lg:w-1/2">
        {children}
      </div>
    </div>
  );
};
