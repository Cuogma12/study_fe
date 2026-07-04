'use client';

import React from 'react';
import { MaterialIcon } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { QuestionDetail } from '../../types/question';

interface QuestionBreadcrumbProps {
  question: QuestionDetail;
}

export const QuestionBreadcrumb = ({ question }: QuestionBreadcrumbProps) => {
  const { navigateTo } = useAppNavigation();

  return (
    <nav className="flex text-sm font-medium text-slate-500">
      <ol className="flex items-center space-x-2">
        <li>
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="hover:text-primary"
          >
            {question.subject?.name ?? '—'}
          </button>
        </li>
        {question.topic?.name && (
          <li className="flex items-center space-x-2">
            <MaterialIcon icon="chevron_right" size="text-xs" />
            <span>{question.topic.name}</span>
          </li>
        )}
        <li className="flex items-center space-x-2">
          <MaterialIcon icon="chevron_right" size="text-xs" />
          <span className="max-w-[200px] truncate text-slate-900 dark:text-slate-100 sm:max-w-none">
            {question.title}
          </span>
        </li>
      </ol>
    </nav>
  );
};
