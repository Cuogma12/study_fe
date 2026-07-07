'use client';

import React from 'react';
import { Button, Input, Select } from '@/shared/components/atoms';

interface AdminLoginHistoryFiltersProps {
  keyword: string;
  status: string;
  statusOptions: Array<{ value: string; label: string }>;
  searchPlaceholder: string;
  applyLabel: string;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onApply: () => void;
}

export const AdminLoginHistoryFilters = ({
  keyword,
  status,
  statusOptions,
  searchPlaceholder,
  applyLabel,
  onKeywordChange,
  onStatusChange,
  onApply,
}: AdminLoginHistoryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_auto]">
      <Input
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder={searchPlaceholder}
      />
      <Select
        options={statusOptions}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      />
      <Button onClick={onApply}>{applyLabel}</Button>
    </div>
  );
};
