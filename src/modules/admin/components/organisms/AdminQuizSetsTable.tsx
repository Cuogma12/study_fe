'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Tag } from '@/shared/components/atoms';
import { CommonDataTable } from '@/shared/components/organisms/CommonDataTable';
import { AdminQuizSetItem } from '../../types/quiz-sets';
import {
  formatAdminDateTime,
  formatAdminStatNumber,
} from '../../utils/formatAdminDisplay';

interface AdminQuizSetsTableProps {
  items: AdminQuizSetItem[];
  loading: boolean;
  updatingId: string | null;
  onEdit: (item: AdminQuizSetItem) => void;
  onTogglePublished: (item: AdminQuizSetItem) => void;
}

export const AdminQuizSetsTable = ({
  items,
  loading,
  updatingId,
  onEdit,
  onTogglePublished,
}: AdminQuizSetsTableProps) => {
  const t = useTranslations('admin.quiz_sets');

  const columns = [
    { key: 'title', label: t('table.title'), className: 'min-w-[220px]' },
    { key: 'subject', label: t('table.subject_grade'), className: 'min-w-[120px]' },
    { key: 'questions', label: t('table.question_count'), className: 'min-w-[80px] text-center' },
    { key: 'duration', label: t('table.duration'), className: 'min-w-[90px]' },
    { key: 'attempts', label: t('table.attempt_count'), className: 'min-w-[80px] text-center' },
    { key: 'status', label: t('table.status'), className: 'min-w-[110px]' },
    { key: 'updated', label: t('table.updated_at'), className: 'min-w-[130px]' },
    { key: 'actions', label: t('table.actions'), className: 'min-w-[160px] text-right' },
  ];

  const tableRows =
    items.length > 0
      ? items.map((item) => {
          const isPublished = Boolean(item.is_published);
          const isUpdating = updatingId === item.id;
          const gradeLabel =
            item.grade_level != null ? t('grades.grade_value', { grade: item.grade_level }) : '—';

          return (
            <tr key={item.id} className="border-t border-slate-100 align-middle">
              <td className="px-4 py-3 text-sm">
                <div className="max-w-[280px] truncate font-medium text-slate-900" title={item.title}>
                  {item.title}
                </div>
                <div className="mt-1 max-w-[280px] truncate text-xs text-slate-500" title={item.slug}>
                  {item.slug}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="font-medium text-slate-700">{item.subject_name || '—'}</div>
                <div className="mt-1 text-xs text-slate-500">{gradeLabel}</div>
              </td>
              <td className="px-4 py-3 text-center text-sm text-slate-700">
                {formatAdminStatNumber(item.question_count)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                {item.duration_minutes != null
                  ? t('table.duration_value', { minutes: item.duration_minutes })
                  : '—'}
              </td>
              <td className="px-4 py-3 text-center text-sm text-slate-700">
                {formatAdminStatNumber(item.attempt_count)}
              </td>
              <td className="px-4 py-3 text-sm">
                <Tag
                  className={`!rounded-full !px-2.5 !py-1 !text-xs !font-semibold !normal-case ${
                    isPublished
                      ? '!bg-emerald-50 !text-emerald-700'
                      : '!bg-slate-100 !text-slate-600'
                  }`}
                >
                  {isPublished ? t('status.published') : t('status.hidden')}
                </Tag>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                {formatAdminDateTime(item.updated_at)}
              </td>
              <td className="px-4 py-3 text-right text-sm">
                <div className="flex flex-nowrap items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="!shrink-0"
                    disabled={isUpdating}
                    onClick={() => onEdit(item)}
                  >
                    {t('actions.edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="!shrink-0"
                    disabled={isUpdating}
                    onClick={() => onTogglePublished(item)}
                  >
                    {isPublished ? t('actions.hide') : t('actions.show')}
                  </Button>
                </div>
              </td>
            </tr>
          );
        })
      : null;

  return (
    <CommonDataTable
      columns={columns}
      loading={loading}
      loadingLabel={t('loading')}
      emptyLabel={t('empty')}
      rows={tableRows}
      minWidthClassName="min-w-[1100px]"
    />
  );
};
