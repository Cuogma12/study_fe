'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { GoogleIcon, FacebookIcon } from '@/shared/components/atoms/icon';
import { Button, Text } from '@/shared/components/atoms';

export const SocialLogins = () => {
  const t = useTranslations();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="!gap-2 !border-slate-200 !py-2.5 dark:!border-slate-800"
        >
          <GoogleIcon size={20} />
          <Text as="span" variant="body2" weight="medium" className="!text-inherit">
            {t('auth.login.google_login')}
          </Text>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!gap-2 !border-slate-200 !py-2.5 dark:!border-slate-800"
        >
          <FacebookIcon size={20} />
          <Text as="span" variant="body2" weight="medium" className="!text-inherit">
            {t('auth.login.facebook_login')}
          </Text>
        </Button>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center">
          <Text variant="body2" className="bg-white px-2 !text-slate-500 dark:bg-background-dark">
            {t('auth.login.or_continue')}
          </Text>
        </div>
      </div>
    </>
  );
};
