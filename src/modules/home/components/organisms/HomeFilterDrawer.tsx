'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Label, Select, Text } from '@/shared/components/atoms';
import { ModalBackdrop } from '@/shared/components/molecules/ModalBackdrop';
import { RadioCardOption } from '@/shared/components/molecules/RadioCardOption';
import { useTranslations } from 'next-intl';
import { Subject } from '@/shared/services/subject.service';
import { HomeFilters, QuestionStatusFilter } from '@/shared/utils/homeFilterParams';
import {
  filterTopicTreeByGrade,
  flattenTopicOptions,
  topicService,
} from '@/modules/questions/services/topic.service';

interface HomeFilterDrawerProps {
  open: boolean;
  filters: HomeFilters;
  subjects: Subject[];
  onClose: () => void;
  onApply: (partial: Pick<HomeFilters, 'topicId' | 'status'>) => void;
  onReset: () => void;
}

export const HomeFilterDrawer = ({
  open,
  filters,
  subjects,
  onClose,
  onApply,
  onReset,
}: HomeFilterDrawerProps) => {
  const t = useTranslations('home.feed.filter_drawer');

  const [draftTopicId, setDraftTopicId] = useState(filters.topicId ?? '');
  const [draftStatus, setDraftStatus] = useState<QuestionStatusFilter>(filters.status);
  const [topicOptions, setTopicOptions] = useState<{ label: string; value: string }[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);

  const canSelectTopic = Boolean(filters.subjectId && filters.gradeLevel);
  const selectedSubjectName = useMemo(
    () => subjects.find((subject) => subject.id === filters.subjectId)?.name,
    [filters.subjectId, subjects]
  );

  const statusOptions = useMemo(
    () =>
      [
        { value: '', label: t('status_all') },
        { value: 'open', label: t('status_open') },
        { value: 'closed', label: t('status_closed') },
      ] as const,
    [t]
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setDraftTopicId(filters.topicId ?? '');
    setDraftStatus(filters.status);
  }, [filters.status, filters.topicId, open]);

  useEffect(() => {
    if (!open || !canSelectTopic || !filters.subjectId || !filters.gradeLevel) {
      setTopicOptions([]);
      return;
    }

    let cancelled = false;

    const loadTopics = async () => {
      setTopicsLoading(true);
      try {
        const tree = await topicService.getBySubject(filters.subjectId!);
        if (cancelled) {
          return;
        }
        const filtered = filterTopicTreeByGrade(tree, filters.gradeLevel!);
        setTopicOptions(flattenTopicOptions(filtered));
      } catch {
        if (!cancelled) {
          setTopicOptions([]);
        }
      } finally {
        if (!cancelled) {
          setTopicsLoading(false);
        }
      }
    };

    loadTopics();
    return () => {
      cancelled = true;
    };
  }, [canSelectTopic, filters.gradeLevel, filters.subjectId, open]);

  if (!open) {
    return null;
  }

  const handleApply = () => {
    onApply({
      topicId: draftTopicId || null,
      status: draftStatus,
    });
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <ModalBackdrop onClick={onClose} ariaLabel={t('close')} />

      <aside className="relative z-10 flex h-full w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <Text variant="h5" weight="bold">
            {t('title')}
          </Text>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            {t('close')}
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <div className="space-y-2">
            <Label>{t('topic')}</Label>
            {!canSelectTopic ? (
              <Text variant="body2" className="!text-slate-500">
                {t('topic_hint')}
              </Text>
            ) : (
              <>
                {selectedSubjectName && (
                  <Text variant="small" className="!text-slate-500">
                    {t('topic_for_subject', { subject: selectedSubjectName })}
                  </Text>
                )}
                <Select
                  value={draftTopicId}
                  onChange={(event) => setDraftTopicId(event.target.value)}
                  options={topicOptions}
                  placeholder={
                    topicsLoading ? t('topic_loading') : t('topic_placeholder')
                  }
                  disabled={topicsLoading || topicOptions.length === 0}
                  className="!py-3 !text-sm"
                />
                {!topicsLoading && topicOptions.length === 0 && (
                  <Text variant="small" className="!text-slate-500">
                    {t('topic_empty')}
                  </Text>
                )}
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('status')}</Label>
            <div className="flex flex-col gap-2">
              {statusOptions.map((option) => (
                <RadioCardOption
                  key={option.value || 'all'}
                  name="home-status-filter"
                  value={option.value}
                  label={option.label}
                  checked={(draftStatus ?? '') === option.value}
                  onChange={() =>
                    setDraftStatus(
                      option.value ? (option.value as QuestionStatusFilter) : null
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t border-slate-200 px-5 py-4 dark:border-slate-700">
          <Button type="button" variant="ghost" className="flex-1" onClick={handleReset}>
            {t('reset')}
          </Button>
          <Button type="button" className="flex-1" onClick={handleApply}>
            {t('apply')}
          </Button>
        </div>
      </aside>
    </div>
  );
};
