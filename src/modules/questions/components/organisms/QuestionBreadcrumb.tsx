'use client';

import React from 'react';
import { MaterialIcon, Text, TextLink } from '@/shared/components/atoms';
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
          <TextLink onClick={() => navigateTo('/')} className="!text-sm !font-medium !text-slate-500">
            {t('home')}
          </TextLink>
        </li>
        <li className="flex items-center gap-2">
          <MaterialIcon icon="chevron_right" size="text-xs" className="text-slate-400" />
          <TextLink onClick={() => navigateTo('/')} className="!text-sm !font-normal !text-slate-500">
            {question.subject?.name ?? '—'}
          </TextLink>
        </li>
        {question.topic?.name && (
          <li className="flex items-center gap-2">
            <MaterialIcon icon="chevron_right" size="text-xs" className="text-slate-400" />
            <Text variant="body2" className="!text-slate-500">
              {question.topic.name}
            </Text>
          </li>
        )}
        <li className="flex min-w-0 items-center gap-2">
          <MaterialIcon icon="chevron_right" size="text-xs" className="shrink-0 text-slate-400" />
          <Text variant="body2" weight="medium" className="truncate !text-slate-700 dark:!text-slate-200">
            {question.title}
          </Text>
        </li>
      </ol>
    </nav>
  );
};
