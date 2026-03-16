'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { GoogleIcon, FacebookIcon } from '@/shared/components/atoms/icon';

export const SocialLogins = () => {
  const t = useTranslations('auth.login');

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <GoogleIcon size={20} />
          <span className="text-sm font-medium">{t('google_login')}</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <FacebookIcon size={20} />
          <span className="text-sm font-medium">{t('facebook_login')}</span>
        </button>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-background-dark px-2 text-slate-500">{t('or_continue')}</span>
        </div>
      </div>
    </>
  );
};
