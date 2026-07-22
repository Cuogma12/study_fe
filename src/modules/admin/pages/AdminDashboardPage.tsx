'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { AdminAccessFallback } from '../components/molecules/AdminAccessFallback';
import { AdminShell } from '../components/organisms/AdminShell';
import { AdminDashboardStatsGrid } from '../components/organisms/AdminDashboardStatsGrid';
import { AdminTopLearnersTable } from '../components/organisms/AdminTopLearnersTable';
import { useAdminAccess } from '../hooks/useAdminAccess';
import { useAdminDashboard } from '../hooks/useAdminDashboard';

export const AdminDashboardPage = () => {
  const t = useTranslations('admin.dashboard');
  const { ready, isAdmin } = useAdminAccess();
  const { data, loading, error } = useAdminDashboard();

  return (
    <AdminAccessFallback
      loading={!ready}
      isAdmin={isAdmin}
      loadingLabel={t('loading')}
      forbiddenLabel={t('forbidden')}
    >
      <AdminShell title={t('title')} description={t('description')}>
        {error ? (
          <Text variant="body2" className="mb-4 !text-red-500">
            {error}
          </Text>
        ) : null}

        <AdminDashboardStatsGrid data={data} loading={loading} />
        <AdminTopLearnersTable items={data.top_learners} loading={loading} />
      </AdminShell>
    </AdminAccessFallback>
  );
};
