'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { CommonDataTable } from '@/shared/components/organisms/CommonDataTable';
import { AdminLoginHistoryItem } from '../../types/login-history';
import { formatDeviceLabel, formatLoginDateTime } from '../../utils/formatLoginHistory';

interface AdminLoginHistoryTableProps {
  items: AdminLoginHistoryItem[];
  loading: boolean;
}

const TABLE_COLUMN_CONFIG = [
  { key: 'time', labelKey: 'table.time', className: 'w-[120px] whitespace-nowrap' },
  { key: 'user', labelKey: 'table.user', className: 'min-w-[160px] max-w-[220px]' },
  { key: 'ip', labelKey: 'table.ip', className: 'w-[120px] whitespace-nowrap' },
  { key: 'device', labelKey: 'table.device', className: 'min-w-[140px] max-w-[180px]' },
  { key: 'status', labelKey: 'table.status', className: 'w-[96px] text-center' },
  { key: 'reason', labelKey: 'table.reason', className: 'min-w-[140px] max-w-[200px]' },
] as const;

export const AdminLoginHistoryTable = ({ items, loading }: AdminLoginHistoryTableProps) => {
  const t = useTranslations('login_history');
  const tApiErrors = useTranslations('api_errors');

  const columns = TABLE_COLUMN_CONFIG.map((column) => ({
    key: column.key,
    label: t(column.labelKey),
    className: column.className,
  }));

  const tableRows =
    items.length > 0
      ? items.map((item) => {
          const { date, time } = formatLoginDateTime(item.created_at);
          const device = formatDeviceLabel(item.user_agent, item.device_info);
          const failureLabel = item.failure_reason
            ? resolveApiErrorMessage(item.failure_reason, tApiErrors)
            : t('table.no_reason');

          return (
            <tr key={item.id} className="border-t border-slate-100 align-top">
              <td className={`px-4 py-3 text-sm ${TABLE_COLUMN_CONFIG[0].className}`}>
                <div>{date}</div>
                {time ? <div className="text-xs text-slate-500">{time}</div> : null}
              </td>
              <td className={`px-4 py-3 text-sm ${TABLE_COLUMN_CONFIG[1].className}`}>
                <div className="truncate" title={item.email ?? undefined}>
                  {item.email ?? t('table.unknown_user')}
                </div>
                <div className="truncate text-xs text-slate-500" title={item.username ?? undefined}>
                  @{item.username ?? '-'}
                </div>
              </td>
              <td className={`px-4 py-3 font-mono text-xs ${TABLE_COLUMN_CONFIG[2].className}`}>
                {item.ip_address ?? '-'}
              </td>
              <td className={`px-4 py-3 text-sm text-slate-600 ${TABLE_COLUMN_CONFIG[3].className}`}>
                <span className="block truncate" title={device.full ?? undefined}>
                  {device.label}
                </span>
              </td>
              <td className={`px-4 py-3 text-sm ${TABLE_COLUMN_CONFIG[4].className}`}>
                <span
                  className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${
                    item.login_successful
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.login_successful ? t('status.success') : t('status.failed')}
                </span>
              </td>
              <td className={`px-4 py-3 text-sm text-slate-600 ${TABLE_COLUMN_CONFIG[5].className}`}>
                {item.login_successful ? (
                  <span className="text-slate-400">—</span>
                ) : (
                  <span className="line-clamp-2" title={failureLabel}>
                    {failureLabel}
                  </span>
                )}
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
    />
  );
};
