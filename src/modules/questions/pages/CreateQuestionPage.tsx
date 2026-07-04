'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useAuth } from '@/shared/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { useCreateQuestion } from '../hooks/useCreateQuestion';
import { CreateQuestionForm } from '../components/organisms/CreateQuestionForm';
import { CreateQuestionFooter } from '../components/organisms/CreateQuestionFooter';
import { CreateQuestionGuidelines } from '../components/organisms/CreateQuestionGuidelines';

export const CreateQuestionPage = () => {
  const t = useTranslations('create_question');
  const { ready, isAuthenticated } = useAuth();
  const formState = useCreateQuestion(isAuthenticated);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <MaterialIcon icon="progress_activity" className="animate-spin text-4xl text-primary" />
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center gap-2">
        <MaterialIcon icon="forum" className="text-primary" />
        <Text
          variant="caption"
          weight="bold"
          className="uppercase tracking-wider !text-slate-500"
        >
          {t('breadcrumb')}
        </Text>
      </div>

      <section className="flex flex-col gap-8">
        <CreateQuestionForm isAuthenticated={isAuthenticated} formState={formState} />
        <CreateQuestionGuidelines />
        <CreateQuestionFooter isAuthenticated={isAuthenticated} formState={formState} />
      </section>
    </main>
  );
};
