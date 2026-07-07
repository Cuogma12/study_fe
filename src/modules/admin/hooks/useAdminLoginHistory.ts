'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { adminService } from '../services/admin.service';
import { AdminLoginHistoryItem, AdminLoginHistoryPagination } from '../types/login-history';

type StatusFilter = 'all' | 'success' | 'failed';

const DEFAULT_PAGINATION: AdminLoginHistoryPagination = {
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 0,
};

export const useAdminLoginHistory = () => {
  const t = useTranslations('login_history');
  const tApiErrors = useTranslations('api_errors');
  const [items, setItems] = useState<AdminLoginHistoryItem[]>([]);
  const [pagination, setPagination] = useState<AdminLoginHistoryPagination>(DEFAULT_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminService.getLoginHistory({
          page,
          limit: DEFAULT_PAGINATION.limit,
          search: keyword.trim() || undefined,
          login_successful: status === 'all' ? undefined : status === 'success',
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
    [keyword, status, t, tApiErrors]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.status_all') },
      { value: 'success', label: t('filters.status_success') },
      { value: 'failed', label: t('filters.status_failed') },
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
    status,
    setStatus,
    statusOptions,
    onSearch: () => fetchData(1),
    onChangePage: (page: number) => fetchData(page),
  };
};
