'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, Select, Text } from '@/shared/components/atoms';

interface Option {
  value: string;
  label: string;
}

interface AdminQuizSetsFiltersProps {
  keyword: string;
  subjectId: string;
  gradeLevel: string;
  publishedFilter: string;
  subjectOptions: Option[];
  gradeOptions: Option[];
  publishedOptions: Option[];
  subjectsLoading?: boolean;
  onKeywordChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onPublishedChange: (value: string) => void;
  onApply: () => void;
}

export const AdminQuizSetsFilters = ({
  keyword,
  subjectId,
  gradeLevel,
  publishedFilter,
  subjectOptions,
  gradeOptions,
  publishedOptions,
  subjectsLoading = false,
  onKeywordChange,
  onSubjectChange,
  onGradeChange,
  onPublishedChange,
  onApply,
}: AdminQuizSetsFiltersProps) => {
  const t = useTranslations('admin.quiz_sets.filters');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_140px_160px_auto] lg:items-end">
        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {t('search_label')}
          </Text>
          <Input
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={t('search_placeholder')}
          />
        </div>
        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {t('subject_label')}
          </Text>
          <Select
            options={subjectOptions}
            value={subjectId}
            disabled={subjectsLoading}
            onChange={(e) => onSubjectChange(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {t('grade_label')}
          </Text>
          <Select
            options={gradeOptions}
            value={gradeLevel}
            onChange={(e) => onGradeChange(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {t('status_label')}
          </Text>
          <Select
            options={publishedOptions}
            value={publishedFilter}
            onChange={(e) => onPublishedChange(e.target.value)}
          />
        </div>
        <Button onClick={onApply}>{t('apply')}</Button>
      </div>
    </div>
  );
};
