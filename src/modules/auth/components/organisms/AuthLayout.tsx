'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SchoolIcon } from '@/shared/components/atoms/icon';
import { Text } from '@/shared/components/atoms';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const t = useTranslations('auth.layout');
  const c = useTranslations('common');

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <SchoolIcon size={20} />
          </div>
          <Text variant="h3">{c('app_name')}</Text>
        </div>
        <div className="z-10 max-w-[300px] text-center">
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              alt="Students studying" 
              className="w-[300px] h-[300px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwkdE7n8KCDbKjA0AZ1QpFOHJXoxRCxFbEv2haTrDHuyaPprsn_1NNJr8yR4X6IEq1O897WF3KslTU1RtXhfawOquo6FtxUfZv3m_WU-L91Jv357MqWvgYP-eQNrsYTqDXP5Ew1vjIAbI66qn10oeP_3rpz-pmTQ8fKMZHVXlnjNrLsqV2CMhpSwCUdWd5bMhJAVvT9hc4j3g04Imh52xtIzhdngAqALWTg7gNz9pspQOpQ8sbKu0c_NbyFciVE-Q4vOxtr9Lezqo" 
            />
          </div>
          <Text variant="h2" className="mb-4">{t('title')}</Text>
          <Text variant="body1" className="!text-slate-600 dark:!text-slate-400 text-lg">
            {t('description')}
          </Text>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Dynamic Content (Login, Register, etc.) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-background-dark">
        {children}
      </div>
    </div>
  );
};
