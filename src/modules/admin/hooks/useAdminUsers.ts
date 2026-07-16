'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { adminService } from '../services/admin.service';
import {
  AdminUserItem,
  AdminUserRole,
  AdminUsersPagination,
  AdminUserStatus,
} from '../types/user-management';
import type { AdminEditUserFormValues } from '../components/organisms/AdminEditUserModal';

const DEFAULT_PAGINATION: AdminUsersPagination = {
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 0,
};

type RoleFilter = 'all' | AdminUserRole;
type StatusFilter = 'all' | AdminUserStatus;

export const useAdminUsers = () => {
  const t = useTranslations('admin.users');
  const tApiErrors = useTranslations('api_errors');
  const [items, setItems] = useState<AdminUserItem[]>([]);
  const [pagination, setPagination] = useState<AdminUsersPagination>(DEFAULT_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState<RoleFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);

      try {
        const data = await adminService.getUsers({
          page,
          limit: DEFAULT_PAGINATION.limit,
          search: keyword.trim() || undefined,
          role: role === 'all' ? undefined : role,
          status: status === 'all' ? undefined : status,
        });
        setItems(data.items);
        setPagination(data.pagination);
      } catch (err: unknown) {
        setItems([]);
        setPagination((current) => ({ ...current, total: 0, total_pages: 0 }));
        setError(resolveApiErrorMessage(err, tApiErrors, t('load_error')));
      } finally {
        setLoading(false);
      }
    },
    [keyword, role, status, t, tApiErrors]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const updateStatus = async (userId: string, nextStatus: AdminUserStatus) => {
    setUpdatingId(userId);
    try {
      const updated = await adminService.updateUserStatus(userId, nextStatus);
      setItems((current) =>
        current.map((item) => (item.id === userId ? { ...item, ...updated } : item))
      );
      return true;
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('update_status_failed')));
      return false;
    } finally {
      setUpdatingId(null);
    }
  };

  const saveEditedUser = async (values: AdminEditUserFormValues) => {
    if (!editingUser) return false;

    setUpdatingId(editingUser.id);
    try {
      const grade =
        values.grade_level === '' ? null : Number.parseInt(values.grade_level, 10);

      let updated = await adminService.updateUserProfile(editingUser.id, {
        username: values.username,
        email: values.email,
        full_name: values.full_name || null,
        avatar_url: values.avatar_url || null,
        bio: values.bio || null,
        grade_level: Number.isFinite(grade) ? grade : null,
      });

      if (values.role !== editingUser.role) {
        updated = await adminService.updateUserRole(editingUser.id, values.role);
      }

      if (values.status !== editingUser.status) {
        updated = await adminService.updateUserStatus(editingUser.id, values.status);
      }

      if (values.new_password.trim()) {
        await adminService.resetUserPassword(editingUser.id, values.new_password.trim());
      }

      setItems((current) =>
        current.map((item) => (item.id === editingUser.id ? { ...item, ...updated } : item))
      );
      return true;
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('edit.save_failed')));
      return false;
    } finally {
      setUpdatingId(null);
    }
  };

  const roleOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.role_all') },
      { value: 'user', label: t('roles.user') },
      { value: 'admin', label: t('roles.admin') },
    ],
    [t]
  );

  const editRoleOptions = useMemo(
    () => [
      { value: 'user' as const, label: t('roles.user') },
      { value: 'admin' as const, label: t('roles.admin') },
    ],
    [t]
  );

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.status_all') },
      { value: 'active', label: t('status.active') },
      { value: 'inactive', label: t('status.inactive') },
      { value: 'banned', label: t('status.banned') },
      { value: 'pending', label: t('status.pending') },
    ],
    [t]
  );

  const editStatusOptions = useMemo(
    () => [
      { value: 'active' as const, label: t('status.active') },
      { value: 'inactive' as const, label: t('status.inactive') },
      { value: 'banned' as const, label: t('status.banned') },
      { value: 'pending' as const, label: t('status.pending') },
    ],
    [t]
  );

  return {
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
    onSearch: () => fetchData(1),
    onChangePage: (page: number) => fetchData(page),
    updateStatus,
    saveEditedUser,
  };
};
