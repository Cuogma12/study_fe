'use client';

import React from 'react';
import { MaterialIcon, Text, Button, Tag } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { QuestionListItem } from '@/modules/home/types/question';
import { SavedQuestionItem } from '../../services/profile.service';
import { ProfileTab } from '../../hooks/useProfilePage';
import { ProfileQuestionRow } from '../molecules/ProfileQuestionRow';

interface ProfileActivityProps {
  tab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  myQuestions: QuestionListItem[];
  savedQuestions: SavedQuestionItem[];
  loading: boolean;
  onQuestionDeleted?: (questionId: string) => void;
}

export const ProfileActivity = ({
  tab,
  onTabChange,
  myQuestions,
  savedQuestions,
  loading,
  onQuestionDeleted,
}: ProfileActivityProps) => {
  const t = useTranslations('profile');

  const tabs: { id: ProfileTab; label: string; icon: string; count: number }[] = [
    {
      id: 'mine',
      label: t('tabs.my_questions'),
      icon: 'edit_note',
      count: myQuestions.length,
    },
    {
      id: 'saved',
      label: t('tabs.saved_questions'),
      icon: 'bookmark',
      count: savedQuestions.length,
    },
  ];

  const questions =
    tab === 'mine' ? myQuestions : savedQuestions.map((item) => item.question);

  return (
    <section className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-900 lg:min-h-[640px]">
      <div className="flex shrink-0 gap-2 border-b border-slate-300 bg-slate-50 p-2.5 dark:border-slate-600 dark:bg-slate-800/50">
        {tabs.map((item) => {
          const active = tab === item.id;
          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={`!h-auto !flex-1 !gap-2 !rounded-xl !border !px-3 !py-2.5 !text-sm !font-semibold ${
                active
                  ? '!border-primary/40 !bg-white !text-primary !shadow-sm dark:!bg-slate-900'
                  : '!border-slate-200 !bg-white/80 !text-slate-500 hover:!border-primary/30 hover:!bg-primary/5 hover:!text-primary dark:!border-slate-700 dark:!bg-slate-900/50 dark:hover:!border-primary/40 dark:hover:!bg-primary/10'
              }`}
            >
              <MaterialIcon icon={item.icon} size="text-lg" />
              <Text as="span" variant="body2" weight="semibold" className="hidden !text-inherit sm:inline">
                {item.label}
              </Text>
              <Tag
                className={`!rounded-full !border !px-1.5 !py-0.5 !text-[11px] ${
                  active
                    ? '!border-primary !bg-primary !text-white'
                    : '!border-slate-200 !bg-slate-50 !text-slate-500 dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-300'
                }`}
              >
                {item.count}
              </Tag>
            </Button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        {loading && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-slate-400">
            <MaterialIcon icon="progress_activity" className="animate-spin text-3xl" />
            <Text variant="body2">{t('loading')}</Text>
          </div>
        )}

        {!loading && questions.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-600 dark:bg-slate-800">
              <MaterialIcon
                icon={tab === 'mine' ? 'edit_note' : 'bookmark_border'}
                className="text-3xl"
              />
            </div>
            <Text variant="body2" weight="semibold" className="!text-slate-700 dark:!text-slate-200">
              {tab === 'mine' ? t('empty_mine') : t('empty_saved')}
            </Text>
            <Text variant="small" className="mt-1 max-w-xs !text-slate-400">
              {tab === 'mine' ? t('empty_mine_hint') : t('empty_saved_hint')}
            </Text>
          </div>
        )}

        {!loading && questions.length > 0 && (
          <div className="scrollbar-nice flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {questions.map((question) => (
              <ProfileQuestionRow
                key={question.id}
                question={question}
                showOwnerMenu={tab === 'mine'}
                onDeleted={onQuestionDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
