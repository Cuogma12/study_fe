'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useTranslations } from 'next-intl';
import { useEditQuestion } from '../hooks/useCreateQuestion';
import { CreateQuestionForm } from '../components/organisms/CreateQuestionForm';
import { CreateQuestionFooter } from '../components/organisms/CreateQuestionFooter';

interface EditQuestionPageProps {
  questionId: string;
}

export const EditQuestionPage = ({ questionId }: EditQuestionPageProps) => {
  const t = useTranslations('create_question');
  const { navigateTo } = useAppNavigation();
  const { ready, isAuthenticated, userId } = useAuth();
  const formState = useEditQuestion(questionId, isAuthenticated, userId);

  if (!ready || formState.loadingQuestion) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <MaterialIcon icon="progress_activity" className="animate-spin text-4xl text-primary" />
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </div>
    );
  }

  if (formState.loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Text variant="body2" className="!text-red-500">
          {t('edit_load_error')}
        </Text>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo(`/questions/${questionId}`)}
        >
          {t('back_to_question')}
        </Button>
      </div>
    );
  }

  if (formState.forbidden) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Text variant="body2" className="!text-red-500">
          {t('edit_forbidden')}
        </Text>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo(`/questions/${questionId}`)}
        >
          {t('back_to_question')}
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center gap-2">
        <MaterialIcon icon="edit" className="text-primary" />
        <Text
          variant="caption"
          weight="bold"
          className="uppercase tracking-wider !text-slate-500"
        >
          {t('edit_breadcrumb')}
        </Text>
      </div>

      <section className="flex flex-col gap-8">
        <CreateQuestionForm isAuthenticated={isAuthenticated} formState={formState} />
        <CreateQuestionFooter isAuthenticated={isAuthenticated} formState={formState} />
      </section>
    </main>
  );
};
