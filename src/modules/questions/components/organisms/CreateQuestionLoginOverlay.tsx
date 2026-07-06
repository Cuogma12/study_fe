'use client';

import React from 'react';
import { MaterialIcon, Text, Button, TextLink } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useTranslations } from 'next-intl';

export const CreateQuestionLoginOverlay = () => {
  const t = useTranslations('create_question');
  const { navigateTo } = useAppNavigation();

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20 p-4">
      <div className="relative flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-2xl border border-gray-300 bg-white p-8 text-center shadow-lg">
        <div className="absolute left-0 top-0 h-1 w-full bg-primary" />

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MaterialIcon icon="lock" className="text-5xl text-primary" />
        </div>

        <Text variant="h3" weight="bold" className="mb-3">
          {t('login_overlay.title')}
        </Text>
        <Text variant="body1" className="mb-8 max-w-md !text-slate-500">
          {t('login_overlay.desc')}
        </Text>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button onClick={() => navigateTo('/login')} className="w-full">
            {t('login_overlay.login')}
          </Button>
          <Text variant="body2" className="!text-slate-500">
            {t('login_overlay.no_account')}{' '}
            <TextLink onClick={() => navigateTo('/register')} className="!text-sm">
              {t('login_overlay.register')}
            </TextLink>
          </Text>
        </div>
      </div>
    </div>
  );
};
