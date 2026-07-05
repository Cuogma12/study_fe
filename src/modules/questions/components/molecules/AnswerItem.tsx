'use client';

import React, { useState } from 'react';
import { MaterialIcon, Button } from '@/shared/components/atoms';
import { useLocale, useTranslations } from 'next-intl';
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime';
import { detailPanel } from '../../constants/detailPanelStyles';
import { AnswerItem as AnswerItemType } from '../../types/answer';
import { AuthorAvatar } from './AuthorAvatar';
import { AnswerForm } from '../organisms/AnswerForm';

interface AnswerItemProps {
  answer: AnswerItemType;
  isClosed: boolean;
  actionLoading: boolean;
  requireAuth: () => boolean;
  onReply: (parentId: string, content: string) => Promise<AnswerItemType | undefined>;
  loadReplies: (answerId: string) => Promise<AnswerItemType[]>;
}

export const AnswerItemCard = ({
  answer,
  isClosed,
  actionLoading,
  requireAuth,
  onReply,
  loadReplies,
}: AnswerItemProps) => {
  const t = useTranslations('question_detail');
  const locale = useLocale();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<AnswerItemType[]>([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const handleToggleReplies = async () => {
    if (repliesLoaded) {
      setRepliesLoaded(false);
      return;
    }

    setLoadingReplies(true);
    try {
      const items = await loadReplies(answer.id);
      setReplies(items);
      setRepliesLoaded(true);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReplyClick = () => {
    if (!requireAuth()) {
      return;
    }
    setShowReplyForm(true);
  };

  const handleSubmitReply = async (content: string) => {
    const reply = await onReply(answer.id, content);
    if (reply) {
      setReplies((current) => [...current, reply]);
      setRepliesLoaded(true);
    }
    setShowReplyForm(false);
  };

  return (
    <div className={detailPanel.answerBlock}>
      <div className="mb-3 flex items-center gap-3">
        <AuthorAvatar
          username={answer.author?.username}
          avatarUrl={answer.author?.avatar_url}
          size="sm"
        />
        <div>
          <p className="text-sm font-bold">{answer.author?.username ?? '—'}</p>
          <p className="text-xs text-slate-500">
            {formatRelativeTime(answer.created_at, locale)}
          </p>
        </div>
      </div>

      <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {answer.content}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!isClosed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReplyClick}
            className="flex items-center gap-1 !px-2"
          >
            <MaterialIcon icon="reply" size="text-sm" />
            {t('reply')}
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleReplies}
          disabled={loadingReplies}
          className="flex items-center gap-1 !px-2"
        >
          <MaterialIcon icon="chat_bubble" size="text-sm" />
          {loadingReplies
            ? t('loading')
            : repliesLoaded
              ? t('hide_replies')
              : t('show_replies')}
        </Button>
      </div>

      {showReplyForm && (
        <div className="mt-4 rounded-xl bg-white/80 p-3 dark:bg-slate-900/50">
          <AnswerForm
            compact
            disabled={actionLoading}
            placeholder={t('reply_placeholder')}
            submitLabel={t('submit_reply')}
            onSubmit={handleSubmitReply}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {repliesLoaded && replies.length > 0 && (
        <div className="mt-4 space-y-2 border-l-2 border-primary/20 pl-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-lg bg-white/80 p-3 dark:bg-slate-900/50"
            >
              <div className="mb-2 flex items-center gap-2">
                <AuthorAvatar
                  username={reply.author?.username}
                  avatarUrl={reply.author?.avatar_url}
                  size="sm"
                />
                <div>
                  <p className="text-xs font-bold">{reply.author?.username ?? '—'}</p>
                  <p className="text-[10px] text-slate-500">
                    {formatRelativeTime(reply.created_at, locale)}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {repliesLoaded && replies.length === 0 && (
        <p className="mt-3 ml-4 text-xs text-slate-400">{t('no_replies')}</p>
      )}
    </div>
  );
};
