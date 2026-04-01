'use client';

import React from 'react';
import { AuthLayout } from '@/modules/auth/components/organisms/AuthLayout';
import { SocialLogins } from '@/modules/auth/components/molecules/SocialLogins';
import { EmailLoginForm } from '@/modules/auth/components/organisms/EmailLoginForm';
import { Text, TextLink } from '@/shared/components/atoms';
import { useLogin } from '@/modules/auth/hooks/useLogin';

export const LoginPage = () => {
  const { t, handleRegisterRedirect } = useLogin();

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center lg:text-left">
          <Text variant="h2">{t('auth.login.title')}</Text>
          <Text variant="body2" className="mt-2 text-slate-600 dark:text-slate-400">
            {t('auth.login.description')}
          </Text>
        </div>

        <div className="space-y-6">
          <SocialLogins />
          <EmailLoginForm />
        </div>

        <Text variant="body2" className="text-center text-slate-600 dark:text-slate-400">
          {t('auth.login.no_account')}{' '}
          <TextLink onClick={handleRegisterRedirect}>{t('auth.login.create_account')}</TextLink>
        </Text>
      </div>
    </AuthLayout>
  );
};
