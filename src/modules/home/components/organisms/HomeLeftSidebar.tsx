'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { HomeSearchField } from '@/shared/components/molecules/HomeSearchField';
import { Subject } from '@/shared/services/subject.service';
import { useTranslations } from 'next-intl';

const GRADE_LEVELS = [12, 11, 10] as const;

interface HomeLeftSidebarProps {
  subjects: Subject[];
  selectedGradeLevel: number | null;
  selectedSubjectId: string | null;
  onGradeChange: (grade: number) => void;
  onSubjectChange: (subjectId: string) => void;
}

export const HomeLeftSidebar = ({
  subjects,
  selectedGradeLevel,
  selectedSubjectId,
  onGradeChange,
  onSubjectChange,
}: HomeLeftSidebarProps) => {
  const t = useTranslations('home.sidebar');

  return (
    <aside className="scrollbar-nice hidden min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 py-6 pr-6 dark:border-slate-700 xl:flex">
      <div className="flex flex-col gap-8">
        <div className="min-w-0 px-2">
          <HomeSearchField showLabel compact />
        </div>

        <div className="flex flex-col gap-4">
          <div className="px-2">
            <Text variant="caption" className="mb-4 block text-slate-400">
              {t('grades')}
            </Text>
            <div className="flex flex-col gap-1">
              {GRADE_LEVELS.map((grade) => {
                const isSelected = selectedGradeLevel === grade;
                return (
                  <Button
                    key={grade}
                    variant={isSelected ? 'secondary' : 'ghost'}
                    className={`!h-auto !px-3 !py-2 ${isSelected ? '!justify-between' : '!justify-start !font-normal'}`}
                    onClick={() => onGradeChange(grade)}
                  >
                    <Text as="span" variant="body2" className="!font-normal">
                      {t(`grade_${grade}` as 'grade_12' | 'grade_11' | 'grade_10')}
                    </Text>
                    {isSelected && <MaterialIcon icon="check_circle" size="text-sm" />}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="px-2">
            <Text variant="caption" className="mb-4 block text-slate-400">
              {t('subjects')}
            </Text>
            <div className="flex flex-col gap-1">
              {subjects.map((subject) => {
                const isSelected = selectedSubjectId === subject.id;
                return (
                  <Button
                    key={subject.id}
                    variant="ghost"
                    onClick={() => onSubjectChange(subject.id)}
                    className={`group !h-auto !justify-start gap-3 !px-3 !py-2 !font-normal ${
                      isSelected
                        ? '!bg-slate-100 dark:!bg-slate-800'
                        : '!text-slate-900 dark:!text-slate-100'
                    }`}
                  >
                    <MaterialIcon
                      icon={subject.icon_url || 'book'}
                      className={`!text-slate-400 ${isSelected ? '!text-primary' : 'group-hover:!text-primary'}`}
                    />
                    <Text variant="body2" weight="medium">
                      {subject.name}
                    </Text>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary to-indigo-600 p-4 text-white shadow-lg">
          <Text variant="caption" className="mb-1 block !text-white/80">
            {t('upgrade_title')}
          </Text>
          <Text variant="body2" weight="semibold" className="mb-3 block !text-white">
            {t('upgrade_desc')}
          </Text>
          <Button
            variant="outline"
            className="w-full !border-white !bg-white !text-primary hover:!bg-slate-50"
          >
            {t('view_pro')}
          </Button>
        </div>
      </div>
    </aside>
  );
};
