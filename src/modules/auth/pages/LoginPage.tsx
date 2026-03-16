'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../components/organisms/AuthLayout';
import { SocialLogins } from '../components/molecules/SocialLogins';
import { EmailLoginForm } from '../components/organisms/EmailLoginForm';
import { Text, TextLink } from '@/shared/components/atoms';

export const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations('auth.login');

  const handleCreateAccount = () => {
    router.push('/register');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center lg:text-left">
          <Text variant="h2">{t('title')}</Text>
          <Text variant="body2" className="mt-2 text-slate-600 dark:text-slate-400">
            {t('description')}
          </Text>
        </div>

        <SocialLogins />
        <EmailLoginForm />

        <Text variant="body2" className="text-center text-slate-600 dark:text-slate-400">
          {t('no_account')}{' '}
          <TextLink onClick={handleCreateAccount}>{t('create_account')}</TextLink>
        </Text>
      </div>
    </AuthLayout>
  );
};
