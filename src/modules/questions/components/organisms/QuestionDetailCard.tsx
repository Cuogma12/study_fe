'use client';

import React from 'react';
import { MaterialIcon, Text, Button, Tag } from '@/shared/components/atoms';
import { SubjectTag, NeutralTag } from '@/shared/components/molecules/SubjectTag';
import { PreviewableImage } from '@/shared/components/molecules/PreviewableImage';
import { MetaStat } from '@/shared/components/molecules/MetaStat';
import { useLocale, useTranslations } from 'next-intl';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
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
  const locale = useLocale();

  const handleSave = async () => {
    if (!requireAuth()) {
      return;
    }
    await onToggleSave();
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
              <SubjectTag name={question.subject.name} slug={question.subject.slug} />
            )}
            {question.topic?.name && <NeutralTag>{question.topic.name}</NeutralTag>}
            {question.grade_level != null && (
              <NeutralTag>{t('grade_level', { level: question.grade_level })}</NeutralTag>
            )}
            {question.is_closed && (
              <Tag
                className="!bg-slate-100 !text-[10px] !text-slate-500 dark:!bg-slate-800 dark:!text-slate-400"
                icon={<MaterialIcon icon="lock" size="text-sm" />}
              >
                {t('closed')}
              </Tag>
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
          </div>
        </div>

        <Text
          variant="body1"
          className="whitespace-pre-wrap !leading-relaxed !text-slate-700 dark:!text-slate-300"
        >
          {question.content}
        </Text>

        {images.length > 0 && (
          <div className="space-y-3">
            {images.map((url) => (
              <PreviewableImage
                key={url}
                src={url}
                imageClassName="max-h-96"
              />
            ))}
          </div>
        )}

        <div className={`${detailPanel.footerDivider} flex flex-wrap items-center gap-4`}>
          <div className="flex items-center gap-3">
            <AuthorAvatar
              username={question.author?.username}
              avatarUrl={question.author?.avatar_url}
            />
            <div>
              <Text variant="body2" weight="bold">
                {question.author?.username ?? '—'}
              </Text>
              <Text variant="small" className="!text-slate-500">
                {formatRelativeTime(question.created_at, locale)}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MetaStat icon="visibility" value={question.views_count} />
            <MetaStat icon="chat_bubble" value={t('answers_count', { count: question.answers_count })} />
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
