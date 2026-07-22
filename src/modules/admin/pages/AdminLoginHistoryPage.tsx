'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { AdminAccessFallback } from '../components/molecules/AdminAccessFallback';
import { AdminPaginationBar } from '../components/molecules/AdminPaginationBar';
import { AdminLoginHistoryFilters } from '../components/molecules/AdminLoginHistoryFilters';
import { AdminShell } from '../components/organisms/AdminShell';
import { AdminLoginHistoryTable } from '../components/organisms/AdminLoginHistoryTable';
import { useAdminAccess } from '../hooks/useAdminAccess';
import { useAdminLoginHistory } from '../hooks/useAdminLoginHistory';

export const AdminLoginHistoryPage = () => {
  const t = useTranslations('login_history');
  const tAdmin = useTranslations('admin');
  const { ready, isAdmin } = useAdminAccess();
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

  return (
    <AdminAccessFallback
      loading={!ready}
      isAdmin={isAdmin}
      loadingLabel={t('loading')}
      forbiddenLabel={t('forbidden')}
    >
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
          <AdminLoginHistoryTable items={items} loading={loading} />
        </div>

        <AdminPaginationBar
          summary={t('pagination.summary', {
            page: pagination.page,
            total_pages: pagination.total_pages,
            total: pagination.total,
          })}
          page={pagination.page}
          totalPages={pagination.total_pages}
          loading={loading}
          prevLabel={t('pagination.prev')}
          nextLabel={t('pagination.next')}
          onPrev={() => onChangePage(pagination.page - 1)}
          onNext={() => onChangePage(pagination.page + 1)}
        />
      </AdminShell>
    </AdminAccessFallback>
  );
};
