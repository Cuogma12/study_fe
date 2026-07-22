'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AdminDashboardData } from '../../types/dashboard';
import {
  formatAdminScore,
  formatAdminStatNumber,
} from '../../utils/formatAdminDisplay';
import { AdminStatCard } from '../molecules/AdminStatCard';

interface AdminDashboardStatsGridProps {
  data: AdminDashboardData;
  loading: boolean;
}

export const AdminDashboardStatsGrid = ({ data, loading }: AdminDashboardStatsGridProps) => {
  const t = useTranslations('admin.dashboard');

  const cards = [
    {
      key: 'users',
      label: t('stats.total_users'),
      value: loading ? '…' : formatAdminStatNumber(data.total_users),
      icon: 'group',
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
    {
      key: 'quiz_sets',
      label: t('stats.total_quiz_sets'),
      value: loading ? '…' : formatAdminStatNumber(data.total_quiz_sets),
      icon: 'quiz',
      iconClassName: 'bg-violet-50 text-violet-600',
    },
    {
      key: 'attempts',
      label: t('stats.total_attempts'),
      value: loading ? '…' : formatAdminStatNumber(data.total_attempts),
      hint: t('stats.attempts_hint'),
      icon: 'edit_document',
      iconClassName: 'bg-orange-50 text-orange-600',
    },
    {
      key: 'average_score',
      label: t('stats.average_score'),
      value: loading ? '…' : formatAdminScore(data.average_score),
      hint: t('stats.average_score_hint'),
      icon: 'grade',
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      key: 'questions',
      label: t('stats.total_questions'),
      value: loading ? '…' : formatAdminStatNumber(data.total_questions),
      icon: 'forum',
      iconClassName: 'bg-sky-50 text-sky-600',
    },
    {
      key: 'ai',
      label: t('stats.total_ai_conversations'),
      value: loading ? '…' : formatAdminStatNumber(data.total_ai_conversations),
      hint: t('stats.ai_hint'),
      icon: 'smart_toy',
      iconClassName: 'bg-fuchsia-50 text-fuchsia-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <AdminStatCard
          key={card.key}
          label={card.label}
          value={card.value}
          hint={card.hint}
          icon={card.icon}
          iconClassName={card.iconClassName}
        />
      ))}
    </div>
  );
};
