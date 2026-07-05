'use client';

import React from 'react';
import { MaterialIcon } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useTranslations } from 'next-intl';
import { QuestionDetail } from '../../types/question';

interface QuestionBreadcrumbProps {
  question: QuestionDetail;
}

export const QuestionBreadcrumb = ({ question }: QuestionBreadcrumbProps) => {
  const { navigateTo } = useAppNavigation();
  const t = useTranslations('home.header');

  return (
    <nav aria-label="Breadcrumb" className="px-1">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        <li>
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="font-medium transition-colors hover:text-primary"
          >
            {t('home')}
          </button>
        </li>
        <li className="flex items-center gap-2">
          <MaterialIcon icon="chevron_right" size="text-xs" className="text-slate-400" />
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="transition-colors hover:text-primary"
          >
            {question.subject?.name ?? '—'}
          </button>
        </li>
        {question.topic?.name && (
          <li className="flex items-center gap-2">
            <MaterialIcon icon="chevron_right" size="text-xs" className="text-slate-400" />
            <span>{question.topic.name}</span>
          </li>
        )}
        <li className="flex min-w-0 items-center gap-2">
          <MaterialIcon icon="chevron_right" size="text-xs" className="shrink-0 text-slate-400" />
          <span className="truncate font-medium text-slate-700 dark:text-slate-200">
            {question.title}
          </span>
        </li>
      </ol>
    </nav>
  );
};
