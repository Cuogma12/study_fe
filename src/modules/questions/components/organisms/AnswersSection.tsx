'use client';

import React from 'react';
import { Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { AnswerItem } from '../../types/answer';
import { AnswerItemCard } from '../molecules/AnswerItem';
import { AnswerForm } from './AnswerForm';

interface AnswersSectionProps {
  answers: AnswerItem[];
  answersCount: number;
  isClosed: boolean;
  isAuthenticated: boolean;
  actionLoading: boolean;
  minContentLength: number;
  requireAuth: () => boolean;
  onSubmitAnswer: (content: string) => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<AnswerItem | undefined>;
  loadReplies: (answerId: string) => Promise<AnswerItem[]>;
}

export const AnswersSection = ({
  answers,
  answersCount,
  isClosed,
  isAuthenticated,
  actionLoading,
  minContentLength,
  requireAuth,
  onSubmitAnswer,
  onReply,
  loadReplies,
}: AnswersSectionProps) => {
  const t = useTranslations('question_detail');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Text variant="h5" weight="bold">
          {t('answers_title')}
        </Text>
        <Text variant="body2" className="!text-slate-500">
          {t('answers_count', { count: answersCount })}
        </Text>
      </div>

      {isClosed ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
          {t('closed_notice')}
        </div>
      ) : isAuthenticated ? (
        <AnswerForm
          minLength={minContentLength}
          disabled={actionLoading}
          onSubmit={onSubmitAnswer}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
          {t('login_to_answer')}
        </div>
      )}

      {answers.length === 0 ? (
        <Text variant="body2" className="py-6 text-center !text-slate-500">
          {t('no_answers')}
        </Text>
      ) : (
        <div className="space-y-4">
          {answers.map((answer) => (
            <AnswerItemCard
              key={answer.id}
              answer={answer}
              isClosed={isClosed}
              actionLoading={actionLoading}
              minContentLength={minContentLength}
              requireAuth={requireAuth}
              onReply={onReply}
              loadReplies={loadReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
};
