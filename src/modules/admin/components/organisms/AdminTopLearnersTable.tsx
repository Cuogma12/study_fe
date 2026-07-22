'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Tag } from '@/shared/components/atoms';
import { CommonDataTable } from '@/shared/components/organisms/CommonDataTable';
import { AdminTopLearnerItem } from '../../types/dashboard';
import {
  formatAdminLearnerName,
  formatAdminScore,
  formatAdminStatNumber,
} from '../../utils/formatAdminDisplay';

interface AdminTopLearnersTableProps {
  items: AdminTopLearnerItem[];
  loading: boolean;
}

export const AdminTopLearnersTable = ({ items, loading }: AdminTopLearnersTableProps) => {
  const t = useTranslations('admin.dashboard');

  const columns = [
    { key: 'rank', label: t('table.rank'), className: 'w-[72px]' },
    { key: 'name', label: t('table.name'), className: 'w-[220px]' },
    { key: 'email', label: t('table.email'), className: 'w-[220px]' },
    { key: 'attempts', label: t('table.attempt_count'), className: 'w-[120px]' },
    { key: 'score', label: t('table.average_score'), className: 'w-[120px] text-right' },
  ];

  const tableRows =
    items.length > 0
      ? items.map((learner, index) => (
          <tr key={learner.user_id} className="border-t border-slate-100">
            <td className="px-4 py-3 text-sm">
              <Tag className="!inline-flex !h-8 !w-8 !items-center !justify-center !rounded-full !bg-indigo-50 !px-0 !py-0 !text-xs !font-bold !text-indigo-700">
                {index + 1}
              </Tag>
            </td>
            <td className="px-4 py-3 text-sm font-medium text-slate-800">
              {formatAdminLearnerName(
                learner.full_name,
                learner.username,
                learner.email
              )}
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{learner.email ?? '—'}</td>
            <td className="px-4 py-3 text-sm text-slate-700">
              {formatAdminStatNumber(learner.attempt_count)}
            </td>
            <td className="px-4 py-3 text-right text-sm font-semibold text-indigo-700">
              {formatAdminScore(learner.average_score)}
            </td>
          </tr>
        ))
      : null;

  return (
    <div className="mt-8">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-900">{t('table.title')}</h3>
        <p className="mt-1 text-sm text-slate-500">{t('table.subtitle')}</p>
      </div>
      <CommonDataTable
        columns={columns}
        loading={loading}
        loadingLabel={t('loading')}
        emptyLabel={t('table.empty')}
        rows={tableRows}
      />
    </div>
  );
};
