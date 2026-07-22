'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';

interface AdminStatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: string;
  iconClassName?: string;
}

export const AdminStatCard = ({
  label,
  value,
  hint,
  icon,
  iconClassName = 'bg-indigo-50 text-indigo-600',
}: AdminStatCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="min-w-0">
        <Text variant="small" className="!font-semibold !text-slate-500">
          {label}
        </Text>
        <Text variant="h3" className="mt-2 !text-3xl !font-bold !text-slate-900">
          {value}
        </Text>
        {hint ? (
          <Text variant="body2" className="mt-1 !text-slate-500">
            {hint}
          </Text>
        ) : null}
      </div>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClassName}`}
      >
        <MaterialIcon icon={icon} size={24} />
      </div>
    </div>
  );
};
