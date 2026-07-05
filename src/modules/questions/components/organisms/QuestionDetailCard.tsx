'use client';

import React, { useState } from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useLocale, useTranslations } from 'next-intl';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { getSubjectBadgeClass, NEUTRAL_BADGE_CLASS } from '@/shared/constants/subjectBadgeThemes';
import { detailPanel } from '../../constants/detailPanelStyles';
import { QuestionDetail } from '../../types/question';
import { AuthorAvatar } from '../molecules/AuthorAvatar';
import { QuestionOwnerMenu } from '../molecules/QuestionOwnerMenu';

interface QuestionDetailCardProps {
  question: QuestionDetail;
  isOwner: boolean;
  actionLoading: boolean;
  onToggleSave: () => Promise<void>;
  onClose: () => Promise<void>;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  requireAuth: () => boolean;
}

export const QuestionDetailCard = ({
  question,
  isOwner,
  actionLoading,
  onToggleSave,
  onClose,
  onEdit,
  onDelete,
  requireAuth,
}: QuestionDetailCardProps) => {
  const t = useTranslations('question_detail');
  const tCreate = useTranslations('create_question');
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

  const handleDelete = async () => {
    if (!window.confirm(t('delete_confirm'))) {
      return;
    }
    await onDelete();
  };

  const images = Array.isArray(question.images) ? question.images : [];

  return (
    <article className={detailPanel.shell}>
      <div className={detailPanel.content}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {question.subject?.name && (
              <span className={getSubjectBadgeClass(question.subject.slug)}>
                {question.subject.name}
              </span>
            )}
            {question.topic?.name && (
              <span className={NEUTRAL_BADGE_CLASS}>{question.topic.name}</span>
            )}
            {question.grade_level != null && (
              <span className={NEUTRAL_BADGE_CLASS}>
                {t('grade_level', { level: question.grade_level })}
              </span>
            )}
            {question.is_closed && (
              <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <MaterialIcon icon="lock" size="text-sm" />
                {t('closed')}
              </span>
            )}
          </div>

          {isOwner && (
            <QuestionOwnerMenu
              onEdit={onEdit}
              onDelete={handleDelete}
              disabled={actionLoading}
            />
          )}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <Text
            variant="h3"
            weight="bold"
            className="min-w-0 flex-1 leading-snug !text-slate-900 dark:!text-white"
          >
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

        <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {question.content}
        </div>

        {images.length > 0 && (
          <div className={detailPanel.softBlock}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {tCreate('fields.images')}
            </p>
            <div className="space-y-3">
              {images.map((url) => (
                <div key={url} className="overflow-hidden rounded-lg bg-white p-2 dark:bg-slate-900">
                  <img
                    src={url}
                    alt=""
                    className="mx-auto max-h-72 w-full rounded-md object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`${detailPanel.footerDivider} flex flex-wrap items-center gap-4`}>
          <div className="flex items-center gap-3">
            <AuthorAvatar
              username={question.author?.username}
              avatarUrl={question.author?.avatar_url}
            />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {question.author?.username ?? '—'}
              </p>
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
      </div>
    </article>
  );
};
