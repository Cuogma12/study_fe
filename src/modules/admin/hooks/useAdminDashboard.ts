'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { adminService } from '../services/admin.service';
import { AdminDashboardData } from '../types/dashboard';

const EMPTY_DASHBOARD: AdminDashboardData = {
  total_users: 0,
  total_quiz_sets: 0,
  total_attempts: 0,
  average_score: null,
  total_questions: 0,
  total_ai_conversations: 0,
  top_learners: [],
};

export const useAdminDashboard = () => {
  const t = useTranslations('admin.dashboard');
  const tApiErrors = useTranslations('api_errors');
  const [data, setData] = useState<AdminDashboardData>(EMPTY_DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await adminService.getDashboard();
      setData(next);
    } catch (err: unknown) {
      setData(EMPTY_DASHBOARD);
      setError(resolveApiErrorMessage(err, tApiErrors, t('load_error')));
    } finally {
      setLoading(false);
    }
  }, [t, tApiErrors]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
