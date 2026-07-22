'use client';

import React from 'react';
import { Button, Text } from '@/shared/components/atoms';

interface AdminPaginationBarProps {
  summary: string;
  page: number;
  totalPages: number;
  loading?: boolean;
  prevLabel: string;
  nextLabel: string;
  onPrev: () => void;
  onNext: () => void;
}

export const AdminPaginationBar = ({
  summary,
  page,
  totalPages,
  loading = false,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
}: AdminPaginationBarProps) => {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Text variant="body2" className="!text-slate-500">
        {summary}
      </Text>
      <div className="flex gap-2">
        <Button variant="outline" disabled={page <= 1 || loading} onClick={onPrev}>
          {prevLabel}
        </Button>
        <Button
          variant="outline"
          disabled={page >= totalPages || loading}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};
