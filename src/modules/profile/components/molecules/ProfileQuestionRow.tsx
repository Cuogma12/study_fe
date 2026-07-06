'use client';

import React, { useState } from 'react';
import { MaterialIcon, Text, Button, Tag } from '@/shared/components/atoms';
import { SubjectTag, NeutralTag } from '@/shared/components/molecules/SubjectTag';
import { MetaStat } from '@/shared/components/molecules/MetaStat';
import { PreviewableImage } from '@/shared/components/molecules/PreviewableImage';
import { normalizeQuestionImages } from '@/shared/utils/normalizeQuestionImages';
import { QuestionListItem } from '@/modules/home/types/question';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useLocale, useTranslations } from 'next-intl';
import { QuestionOwnerMenu } from '@/modules/questions/components/molecules/QuestionOwnerMenu';
import { questionService } from '@/modules/questions/services/question.service';

interface ProfileQuestionRowProps {
  question: QuestionListItem;
  showOwnerMenu?: boolean;
  onDeleted?: (questionId: string) => void;
}

export const ProfileQuestionRow = ({
  question,
  showOwnerMenu = false,
  onDeleted,
}: ProfileQuestionRowProps) => {
  const t = useTranslations('profile');
  const tDetail = useTranslations('question_detail');
  const locale = useLocale();
  const { navigateTo } = useAppNavigation();
  const [deleting, setDeleting] = useState(false);

  const images = normalizeQuestionImages(question.images);
  const coverImage = images[0];

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
    <div className="group relative flex w-full shrink-0 flex-col gap-2.5 rounded-xl border border-gray-300 bg-white px-4 py-4 transition-all hover:border-primary/50 hover:shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:hover:border-primary/50">
      <div className="flex flex-wrap items-center gap-2">
        {question.subject?.name && (
          <SubjectTag name={question.subject.name} slug={question.subject.slug} />
        )}
        {question.is_closed && (
          <Tag className="!bg-slate-200/80 !px-2 !py-0.5 !text-[10px] !text-slate-500 dark:!bg-slate-700 dark:!text-slate-300">
            {t('closed')}
          </Tag>
        )}
        <Text
          as="span"
          variant="caption"
          className="ml-auto inline-flex items-center gap-1 !normal-case !text-slate-400"
        >
          {formatRelativeTime(question.created_at, locale)}
          {showOwnerMenu && (
            <QuestionOwnerMenu onEdit={handleEdit} onDelete={handleDelete} disabled={deleting} />
          )}
        </Text>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => navigateTo(`/questions/${question.id}`)}
        className="!h-auto !w-full !flex-col !items-start !justify-start !rounded-none !p-0 !text-left hover:!bg-transparent"
      >
        <Text
          variant="body2"
          weight="semibold"
          className="line-clamp-2 !text-slate-900 transition-colors group-hover:!text-primary dark:!text-slate-100"
        >
          {question.title}
        </Text>

        {question.excerpt && (
          <Text variant="small" className="mt-1 line-clamp-1 !text-slate-500 dark:!text-slate-400">
            {question.excerpt}
          </Text>
        )}

        <div className="mt-2 flex items-center gap-4">
          <MetaStat icon="visibility" value={question.views_count} />
          <MetaStat icon="chat_bubble" value={question.answers_count} />
        </div>
      </Button>

      {coverImage && (
        <PreviewableImage
          src={coverImage}
          frameClassName="!p-1.5"
          imageClassName="aspect-[16/9] max-h-44 object-cover"
        />
      )}
    </div>
  );
};
