'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { useHomeFeed, HomeFeedFilters } from '../../hooks/useHomeFeed';
import { QuestionCard } from '../molecules/QuestionCard';

interface HomeFeedProps {
  filters: HomeFeedFilters;
}

export const HomeFeed = ({ filters }: HomeFeedProps) => {
  const t = useTranslations('home.feed');
  const { questions, loading, error } = useHomeFeed(filters);

  return (
    <section className="min-w-0 flex-1">
      <div className="mb-6 flex items-center justify-between">
        <Text variant="h3">{t('latest_questions')}</Text>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 !border-slate-200 !bg-white px-3 py-1.5 !text-slate-900 dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100"
          >
            <MaterialIcon icon="filter_list" size="text-lg" />
            {t('filter')}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {loading && (
          <Text variant="body2" className="py-8 text-center !text-slate-500">
            {t('loading')}
          </Text>
        )}

        {!loading && error && (
          <Text variant="body2" className="py-8 text-center !text-red-500">
            {t(error)}
          </Text>
        )}

        {!loading && !error && questions.length === 0 && (
          <Text variant="body2" className="py-8 text-center !text-slate-500">
            {t('empty')}
          </Text>
        )}

        {!loading &&
          !error &&
          questions.map((question) => <QuestionCard key={question.id} question={question} />)}
      </div>
    </section>
  );
};
