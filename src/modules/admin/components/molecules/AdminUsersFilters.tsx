'use client';

import React from 'react';
import { Button, Input, Select, Text } from '@/shared/components/atoms';

interface Option {
  value: string;
  label: string;
}

interface AdminUsersFiltersProps {
  keyword: string;
  role: string;
  status: string;
  roleOptions: Option[];
  statusOptions: Option[];
  labels: {
    search: string;
    role: string;
    status: string;
    apply: string;
    placeholder: string;
  };
  onKeywordChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onApply: () => void;
}

export const AdminUsersFilters = ({
  keyword,
  role,
  status,
  roleOptions,
  statusOptions,
  labels,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
  onApply,
}: AdminUsersFiltersProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px_220px_auto] md:items-end">
        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {labels.search}
          </Text>
          <Input
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={labels.placeholder}
          />
        </div>

        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {labels.role}
          </Text>
          <Select
            options={roleOptions}
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Text variant="small" className="!font-semibold !text-slate-600">
            {labels.status}
          </Text>
          <Select
            options={statusOptions}
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          />
        </div>

        <Button onClick={onApply}>{labels.apply}</Button>
      </div>
    </div>
  );
};
