'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { QuestionListItem } from '@/modules/home/types/question';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { getSubjectBadgeClass } from '@/shared/constants/subjectBadgeThemes';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useLocale, useTranslations } from 'next-intl';

interface ProfileQuestionRowProps {
  question: QuestionListItem;
}

export const ProfileQuestionRow = ({ question }: ProfileQuestionRowProps) => {
  const t = useTranslations('profile');
  const locale = useLocale();
  const { navigateTo } = useAppNavigation();

  return (
    <button
      type="button"
      onClick={() => navigateTo(`/questions/${question.id}`)}
      className="group flex w-full shrink-0 flex-col gap-2.5 rounded-xl border border-slate-300 bg-white px-4 py-4 text-left transition-all hover:border-primary/50 hover:shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:hover:border-primary/50"
    >
      <div className="flex flex-wrap items-center gap-2">
        {question.subject?.name && (
          <span className={getSubjectBadgeClass(question.subject.slug)}>
            {question.subject.name}
          </span>
        )}
        {question.is_closed && (
          <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-700 dark:text-slate-300">
            {t('closed')}
          </span>
        )}
        <span className="ml-auto text-[11px] text-slate-400">
          {formatRelativeTime(question.created_at, locale)}
        </span>
      </div>

      <Text
        variant="body2"
        weight="semibold"
        className="line-clamp-2 !text-slate-900 transition-colors group-hover:!text-primary dark:!text-slate-100"
      >
        {question.title}
      </Text>

      {question.excerpt && (
        <p className="line-clamp-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {question.excerpt}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <MaterialIcon icon="visibility" size="text-sm" />
          {question.views_count}
        </span>
        <span className="flex items-center gap-1">
          <MaterialIcon icon="chat_bubble" size="text-sm" />
          {question.answers_count}
        </span>
      </div>
    </button>
  );
};
