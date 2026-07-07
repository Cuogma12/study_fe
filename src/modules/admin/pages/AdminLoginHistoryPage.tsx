'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Text } from '@/shared/components/atoms';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAdminLoginHistory } from '../hooks/useAdminLoginHistory';
import { AdminShell } from '../components/organisms/AdminShell';
import { AdminLoginHistoryFilters } from '../components/molecules/AdminLoginHistoryFilters';
import { CommonDataTable } from '@/shared/components/organisms/CommonDataTable';

export const AdminLoginHistoryPage = () => {
  const t = useTranslations('login_history');
  const tAdmin = useTranslations('admin');
  const { ready, user } = useAuth();
  const {
    items,
    pagination,
    loading,
    error,
    keyword,
    setKeyword,
    status,
    setStatus,
    statusOptions,
    onSearch,
    onChangePage,
  } = useAdminLoginHistory();

  if (!ready) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </main>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-red-500">
          {t('forbidden')}
        </Text>
      </main>
    );
  }

  const tableRows =
    items.length > 0
      ? items.map((item) => (
          <tr key={item.id} className="border-t border-slate-100 align-top">
            <td className="px-4 py-3 text-sm">
              {new Intl.DateTimeFormat('vi-VN', {
                dateStyle: 'short',
                timeStyle: 'medium',
              }).format(new Date(item.created_at))}
            </td>
            <td className="px-4 py-3 text-sm">
              <div>{item.email ?? '-'}</div>
              <div className="text-xs text-slate-500">{item.username ?? '-'}</div>
            </td>
            <td className="px-4 py-3 text-sm">{item.ip_address ?? '-'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{item.user_agent ?? item.device_info ?? '-'}</td>
            <td className="px-4 py-3 text-sm">
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
            <td className="px-4 py-3 text-sm">{item.failure_reason ?? '-'}</td>
          </tr>
        ))
      : null;

  return (
    <AdminShell title={tAdmin('title')} description={tAdmin('description')}>
      <AdminLoginHistoryFilters
        keyword={keyword}
        status={status}
        statusOptions={statusOptions}
        searchPlaceholder={t('filters.search_placeholder')}
        applyLabel={t('filters.apply')}
        onKeywordChange={setKeyword}
        onStatusChange={(value) => setStatus(value as typeof status)}
        onApply={onSearch}
      />

      {error ? (
        <Text variant="body2" className="mt-3 !text-red-500">
          {error}
        </Text>
      ) : null}

      <div className="mt-4">
        <CommonDataTable
          headers={[
            t('table.time'),
            t('table.user'),
            t('table.ip'),
            t('table.device'),
            t('table.status'),
            t('table.reason'),
          ]}
          loading={loading}
          loadingLabel={t('loading')}
          emptyLabel={t('empty')}
          colSpan={6}
          rows={tableRows}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Text variant="body2" className="!text-slate-500">
          {t('pagination.summary', {
            page: pagination.page,
            total_pages: pagination.total_pages,
            total: pagination.total,
          })}
        </Text>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={pagination.page <= 1 || loading}
            onClick={() => onChangePage(pagination.page - 1)}
          >
            {t('pagination.prev')}
          </Button>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.total_pages || loading}
            onClick={() => onChangePage(pagination.page + 1)}
          >
            {t('pagination.next')}
          </Button>
        </div>
      </div>
    </AdminShell>
  );
};
