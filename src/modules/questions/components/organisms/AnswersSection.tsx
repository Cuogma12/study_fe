'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { detailPanel } from '../../constants/detailPanelStyles';
import { AnswerItem } from '../../types/answer';
import { AnswerItemCard } from '../molecules/AnswerItem';
import { AnswerForm } from './AnswerForm';

interface AnswersSectionProps {
  answers: AnswerItem[];
  answersCount: number;
  isClosed: boolean;
  isAuthenticated: boolean;
  actionLoading: boolean;
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
  requireAuth,
  onSubmitAnswer,
  onReply,
  loadReplies,
}: AnswersSectionProps) => {
  const t = useTranslations('question_detail');

  return (
    <section className={detailPanel.shell}>
      <div className={`${detailPanel.headerBar} flex items-center gap-2.5`}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
          <MaterialIcon icon="forum" size="text-lg" />
        </div>
        <div>
          <Text variant="body1" weight="bold" className="!text-slate-900 dark:!text-white">
            {t('answers_title')}
          </Text>
          <Text variant="small" className="!text-slate-500">
            {t('answers_count', { count: answersCount })}
          </Text>
        </div>
      </div>

      <div className={detailPanel.composeSection}>
        <div className={detailPanel.composeArea}>
          {isClosed ? (
            <Text variant="body2" className="!text-slate-600 dark:!text-slate-300">
              {t('closed_notice')}
            </Text>
          ) : isAuthenticated ? (
            <AnswerForm
              disabled={actionLoading}
              onSubmit={onSubmitAnswer}
            />
          ) : (
            <Text variant="body2" weight="medium" className="!text-primary">
              {t('login_to_answer')}
            </Text>
          )}
        </div>
      </div>

      <div className={detailPanel.listSection}>
        {answers.length === 0 ? (
          <Text variant="body2" className="py-2 text-center !text-slate-500">
            {t('no_answers')}
          </Text>
        ) : (
          <>
            <Text
              variant="caption"
              className="mb-4 !normal-case !tracking-wide !text-slate-500"
            >
              {t('answers_list_label')}
            </Text>
            <div className="flex flex-col gap-3">
              {answers.map((answer) => (
                <AnswerItemCard
                  key={answer.id}
                  answer={answer}
                  isClosed={isClosed}
                  actionLoading={actionLoading}
                  requireAuth={requireAuth}
                  onReply={onReply}
                  loadReplies={loadReplies}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
