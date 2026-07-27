import React from 'react';
import { Text } from '../atoms';

interface ProfileStatCardProps {
  label: string;
  value: number | string;
}

export const ProfileStatCard = ({ label, value }: ProfileStatCardProps) => (
  <div className="rounded-xl border border-gray-300 bg-slate-50 px-4 py-3 dark:border-slate-600 dark:bg-slate-800/60">
    <Text variant="small" weight="medium" className="!text-slate-500">
      {label}
    </Text>
    <Text variant="h3" weight="bold" className="mt-0.5 !text-slate-900 dark:!text-white">
      {value}
    </Text>
  </div>
);
