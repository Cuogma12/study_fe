'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { AdminAccessFallback } from '../components/molecules/AdminAccessFallback';
import { AdminPaginationBar } from '../components/molecules/AdminPaginationBar';
import { AdminShell } from '../components/organisms/AdminShell';
import { AdminUsersFilters } from '../components/molecules/AdminUsersFilters';
import { AdminUsersTable } from '../components/organisms/AdminUsersTable';
import { AdminEditUserModal } from '../components/organisms/AdminEditUserModal';
import { useAdminAccess } from '../hooks/useAdminAccess';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { AdminUserStatus } from '../types/user-management';

export const AdminUsersPage = () => {
  const t = useTranslations('admin.users');
  const { ready, user, isAdmin } = useAdminAccess();
  const [actionNotice, setActionNotice] = useState<string | null>(null);
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
    editRoleOptions,
    editStatusOptions,
    statusOptions,
    updatingId,
    editingUser,
    setEditingUser,
    onSearch,
    onChangePage,
    updateStatus,
    saveEditedUser,
  } = useAdminUsers();

  const handleUpdateStatus = async (
    userId: string,
    nextStatus: AdminUserStatus
  ) => {
    if (user?.userId && user.userId === userId) {
      setActionNotice(
        nextStatus === 'banned'
          ? t('actions.self_protected')
          : t('actions.self_activate_protected')
      );
      return;
    }

    setActionNotice(null);
    const confirmText =
      nextStatus === 'banned' ? t('confirm.ban') : t('confirm.activate');
    const ok = window.confirm(confirmText);
    if (!ok) return;
    await updateStatus(userId, nextStatus);
  };

  return (
    <AdminAccessFallback
      loading={!ready}
      isAdmin={isAdmin}
      loadingLabel={t('loading')}
      forbiddenLabel={t('forbidden')}
    >
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

        {actionNotice ? (
          <Text variant="body2" className="mt-3 !text-amber-600">
            {actionNotice}
          </Text>
        ) : null}

        {error ? (
          <Text variant="body2" className="mt-3 !text-red-500">
            {error}
          </Text>
        ) : null}

        <div className="mt-4">
          <AdminUsersTable
            items={items}
            loading={loading}
            updatingId={updatingId}
            onUpdateStatus={handleUpdateStatus}
            onEdit={setEditingUser}
          />
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

        <AdminEditUserModal
          user={editingUser}
          saving={updatingId === editingUser?.id}
          canChangeRole={Boolean(editingUser && editingUser.id !== user?.userId)}
          canChangeStatus={Boolean(editingUser && editingUser.id !== user?.userId)}
          roleOptions={editRoleOptions}
          statusOptions={editStatusOptions}
          onClose={() => setEditingUser(null)}
          onSave={saveEditedUser}
        />
      </AdminShell>
    </AdminAccessFallback>
  );
};
