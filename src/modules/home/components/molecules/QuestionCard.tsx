'use client';

import React, { useState } from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { QuestionListItem } from '../../types/question';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { useLocale, useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { getSubjectBadgeClass, NEUTRAL_BADGE_CLASS } from '@/shared/constants/subjectBadgeThemes';
import { QuestionOwnerMenu } from '@/modules/questions/components/molecules/QuestionOwnerMenu';
import { questionService } from '@/modules/questions/services/question.service';

interface QuestionCardProps {
  question: QuestionListItem;
  onDeleted?: (questionId: string) => void;
}

export const QuestionCard = ({ question, onDeleted }: QuestionCardProps) => {
  const t = useTranslations('home.feed');
  const tDetail = useTranslations('question_detail');
  const locale = useLocale();
  const { navigateTo } = useAppNavigation();
  const { userId } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const isOwner = Boolean(userId && question.author?.id === userId);

  const handleOpen = () => {
    navigateTo(`/questions/${question.id}`);
  };

  const handleEdit = () => {
    navigateTo(`/questions/${question.id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm(tDetail('delete_confirm'))) {
      return;
    }

    setDeleting(true);
    try {
      await questionService.delete(question.id);
      onDeleted?.(question.id);
    } catch {
      window.alert(tDetail('delete_failed'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      className="group flex cursor-pointer flex-col rounded-xl border border-slate-300 bg-white p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-slate-600 dark:bg-slate-900 dark:hover:border-primary/50"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {question.subject?.name && (
            <span className={getSubjectBadgeClass(question.subject.slug)}>
              {question.subject.name}
            </span>
          )}
          {question.topic?.name && <span className={NEUTRAL_BADGE_CLASS}>{question.topic.name}</span>}
          {question.grade_level != null && (
            <span className={NEUTRAL_BADGE_CLASS}>
              {t('grade_level', { level: question.grade_level })}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {question.is_pinned && (
            <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <MaterialIcon icon="push_pin" size="text-sm" />
              {t('pinned')}
            </span>
          )}
          {question.is_closed && (
            <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <MaterialIcon icon="lock" size="text-sm" />
              {t('closed')}
            </span>
          )}
          {isOwner && (
            <QuestionOwnerMenu
              onEdit={handleEdit}
              onDelete={handleDelete}
              disabled={deleting}
            />
          )}
        </div>
      </div>

      <Text variant="h5" className="mb-2 transition-colors group-hover:text-primary">
        {question.title}
      </Text>
      <Text variant="body2" className="mb-4 line-clamp-2 !text-slate-600 dark:!text-slate-400">
        {question.excerpt}
      </Text>

      <div className="mt-auto flex items-center justify-between border-t border-slate-300 pt-4 dark:border-slate-600">
        <div className="flex items-center gap-3">
          {question.author?.avatar_url ? (
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={question.author.avatar_url}
                alt={question.author.username}
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
              {question.author?.username?.charAt(0).toUpperCase() ?? '?'}
            </div>
          )}
          <div>
            <p className="text-xs font-bold">{question.author?.username ?? '—'}</p>
            <p className="text-[10px] text-slate-500">
              {formatRelativeTime(question.created_at, locale)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1 text-xs">
            <MaterialIcon icon="visibility" size="text-sm" />
            {question.views_count}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <MaterialIcon icon="chat_bubble" size="text-sm" />
            {question.answers_count}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            {t('solve')}
          </Button>
        </div>
      </div>
    </article>
  );
};
