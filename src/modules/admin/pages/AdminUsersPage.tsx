'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Text } from '@/shared/components/atoms';
import { useAuth } from '@/shared/hooks/useAuth';
import { AdminShell } from '../components/organisms/AdminShell';
import { AdminUsersFilters } from '../components/molecules/AdminUsersFilters';
import { AdminUsersTable } from '../components/organisms/AdminUsersTable';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { AdminUserStatus } from '../types/user-management';

export const AdminUsersPage = () => {
  const t = useTranslations('admin.users');
  const { ready, user } = useAuth();
  const {
    items,
    pagination,
    loading,
    error,
    keyword,
    setKeyword,
    role,
    setRole,
    status,
    setStatus,
    roleOptions,
    statusOptions,
    updatingId,
    onSearch,
    onChangePage,
    updateStatus,
  } = useAdminUsers();

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

  const handleUpdateStatus = async (
    userId: string,
    nextStatus: AdminUserStatus
  ) => {
    const confirmText =
      nextStatus === 'banned' ? t('confirm.ban') : t('confirm.activate');
    const ok = window.confirm(confirmText);
    if (!ok) return;
    await updateStatus(userId, nextStatus);
  };

  return (
    <AdminShell title={t('title')} description={t('description')}>
      <AdminUsersFilters
        keyword={keyword}
        role={role}
        status={status}
        roleOptions={roleOptions}
        statusOptions={statusOptions}
        labels={{
          search: t('filters.search_label'),
          role: t('filters.role_label'),
          status: t('filters.status_label'),
          apply: t('filters.apply'),
          placeholder: t('filters.search_placeholder'),
        }}
        onKeywordChange={setKeyword}
        onRoleChange={(value) => setRole(value as typeof role)}
        onStatusChange={(value) => setStatus(value as typeof status)}
        onApply={onSearch}
      />

      {error ? (
        <Text variant="body2" className="mt-3 !text-red-500">
          {error}
        </Text>
      ) : null}

      <div className="mt-4">
        <AdminUsersTable
          items={items}
          loading={loading}
          currentUserId={user.userId}
          updatingId={updatingId}
          onUpdateStatus={handleUpdateStatus}
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
