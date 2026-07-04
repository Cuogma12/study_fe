'use client';

import React, { useState } from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useLocale, useTranslations } from 'next-intl';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { QuestionDetail } from '../../types/question';
import { AuthorAvatar } from '../molecules/AuthorAvatar';

interface QuestionDetailCardProps {
  question: QuestionDetail;
  isOwner: boolean;
  actionLoading: boolean;
  onToggleSave: () => Promise<void>;
  onClose: () => Promise<void>;
  requireAuth: () => boolean;
}

export const QuestionDetailCard = ({
  question,
  isOwner,
  actionLoading,
  onToggleSave,
  onClose,
  requireAuth,
}: QuestionDetailCardProps) => {
  const t = useTranslations('question_detail');
  const locale = useLocale();
  const [shareDone, setShareDone] = useState(false);

  const handleSave = async () => {
    if (!requireAuth()) {
      return;
    }
    await onToggleSave();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareDone(true);
      setTimeout(() => setShareDone(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleClose = async () => {
    if (!window.confirm(t('close_confirm'))) {
      return;
    }
    await onClose();
  };

  const images = Array.isArray(question.images) ? question.images : [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <Text variant="h3" weight="bold" className="min-w-0 flex-1 leading-tight">
          {question.title}
        </Text>

        <div className="flex shrink-0 gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={actionLoading}
            onClick={handleSave}
            className="flex items-center gap-1"
          >
            <MaterialIcon icon="bookmark" size="text-lg" />
            {question.is_saved ? t('saved') : t('save')}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <MaterialIcon icon="share" size="text-lg" />
            {shareDone ? t('link_copied') : t('share')}
          </Button>
        </div>
      </div>

      <div className="mb-6 whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
        {question.content}
      </div>

      {images.length > 0 && (
        <div className="mb-6 space-y-3">
          {images.map((url) => (
            <div
              key={url}
              className="overflow-hidden rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50"
            >
              <img
                src={url}
                alt=""
                className="mx-auto max-h-64 rounded-lg object-contain"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <AuthorAvatar
            username={question.author?.username}
            avatarUrl={question.author?.avatar_url}
          />
          <div>
            <p className="text-sm font-bold">{question.author?.username ?? '—'}</p>
            <p className="text-xs text-slate-500">
              {formatRelativeTime(question.created_at, locale)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <MaterialIcon icon="visibility" size="text-sm" />
            {question.views_count}
          </span>
          <span className="flex items-center gap-1">
            <MaterialIcon icon="chat_bubble" size="text-sm" />
            {t('answers_count', { count: question.answers_count })}
          </span>
        </div>

        {isOwner && !question.is_closed && (
          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={actionLoading}
              onClick={handleClose}
              className="flex items-center gap-1"
            >
              <MaterialIcon icon="lock" size="text-sm" />
              {t('close_discussion')}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
