'use client';

import React, { useEffect, useState } from 'react';
import { MaterialIcon, Text, Button, Tag } from '@/shared/components/atoms';
import { SubjectTag, NeutralTag } from '@/shared/components/molecules/SubjectTag';
import { PreviewableImage } from '@/shared/components/molecules/PreviewableImage';
import { QuestionListItem } from '../../types/question';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { useLocale, useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { QuestionOwnerMenu } from '@/modules/questions/components/molecules/QuestionOwnerMenu';
import { questionService } from '@/modules/questions/services/question.service';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';

interface QuestionCardProps {
  question: QuestionListItem;
  onDeleted?: (questionId: string) => void;
  onSavedChange?: (questionId: string, saved: boolean) => void;
}

const normalizeQuestionImages = (images: unknown): string[] => {
  if (Array.isArray(images)) {
    return images.filter((url): url is string => typeof url === 'string' && url.trim().length > 0);
  }

  if (typeof images === 'string' && images.trim()) {
    try {
      const parsed = JSON.parse(images) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((url): url is string => typeof url === 'string' && url.trim().length > 0);
      }
    } catch {
      return [];
    }
  }

  return [];
};

const QuestionCardImages = ({ images }: { images: string[] }) => {
  if (images.length === 0) {
    return null;
  }

  const visibleImages = images.slice(0, 4);
  const extraCount = images.length - visibleImages.length;

  return (
    <div
      className={`mb-4 ${
        visibleImages.length > 1 ? 'grid grid-cols-2 gap-2' : ''
      }`}
    >
      {visibleImages.map((url, index) => (
        <div key={`${url}-${index}`} className="relative">
          <PreviewableImage
            src={url}
            onActivate={(event) => event.stopPropagation()}
            frameClassName={
              visibleImages.length === 1 ? '!p-1.5' : '!p-1'
            }
            imageClassName={
              visibleImages.length === 1
                ? 'aspect-[4/3] max-h-72 object-cover'
                : 'aspect-video object-cover'
            }
          />
          {index === visibleImages.length - 1 && extraCount > 0 && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/45"
              aria-hidden
            >
              <Text variant="body2" weight="bold" className="!text-white">
                +{extraCount}
              </Text>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const feedStatPillClass =
  'inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-slate-600 transition-colors hover:!border-primary hover:!bg-white hover:!text-primary dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:!border-primary dark:hover:!bg-slate-900 dark:hover:!text-primary';

export const QuestionCard = ({ question, onDeleted, onSavedChange }: QuestionCardProps) => {
  const t = useTranslations('home.feed');
  const tDetail = useTranslations('question_detail');
  const tApiError = useTranslations('api_errors');
  const locale = useLocale();
  const { navigateTo } = useAppNavigation();
  const { userId, isAuthenticated } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [isSaved, setIsSaved] = useState(question.is_saved);
  const [saving, setSaving] = useState(false);

  const images = normalizeQuestionImages(question.images);
  const isOwner = Boolean(userId && question.author?.id === userId);

  useEffect(() => {
    setIsSaved(question.is_saved);
  }, [question.id, question.is_saved]);

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

  const handleToggleSave = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      navigateTo('/login');
      return;
    }

    setSaving(true);
    try {
      const result = await questionService.toggleSave(question.id);
      setIsSaved(result.saved);
      onSavedChange?.(question.id, result.saved);
    } catch (error) {
      window.alert(resolveApiErrorMessage(error, tApiError, tApiError('fallback')));
    } finally {
      setSaving(false);
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
            <SubjectTag name={question.subject.name} slug={question.subject.slug} />
          )}
          {question.topic?.name && <NeutralTag>{question.topic.name}</NeutralTag>}
          {question.grade_level != null && (
            <NeutralTag>{t('grade_level', { level: question.grade_level })}</NeutralTag>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {question.is_closed && (
            <Tag
              className="!bg-slate-100 !text-[10px] !text-slate-500 dark:!bg-slate-800 dark:!text-slate-400"
              icon={<MaterialIcon icon="lock" size="text-sm" />}
            >
              {t('closed')}
            </Tag>
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

      {images.length > 0 && <QuestionCardImages images={images} />}

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
          <div className="flex min-w-0 flex-col gap-1.5">
            <Text variant="small" weight="bold" className="leading-tight">
              {question.author?.username ?? '—'}
            </Text>
            <Text variant="caption" className="!mt-0 !normal-case !leading-tight !text-slate-500">
              {formatRelativeTime(question.created_at, locale)}
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={feedStatPillClass}>
            <MaterialIcon icon="visibility" size="text-base" />
            <Text as="span" variant="small" className="!text-inherit">
              {question.views_count}
            </Text>
          </div>
          <div className={feedStatPillClass}>
            <MaterialIcon icon="chat_bubble" size="text-base" />
            <Text as="span" variant="small" className="!text-inherit">
              {question.answers_count}
            </Text>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={saving}
            aria-label={isSaved ? tDetail('saved') : tDetail('save')}
            onClick={handleToggleSave}
            className={`!h-9 !min-w-9 !shrink-0 !rounded-full !border !px-2.5 !font-normal transition-colors ${feedStatPillClass} ${
              isSaved
                ? '!border-primary !bg-white !text-primary hover:!border-primary hover:!bg-white hover:!text-primary dark:!bg-slate-900 dark:hover:!bg-slate-900'
                : ''
            }`}
          >
            <MaterialIcon
              icon={isSaved ? 'bookmark' : 'bookmark_border'}
              size="text-xl"
              className="!text-inherit"
            />
          </Button>
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
