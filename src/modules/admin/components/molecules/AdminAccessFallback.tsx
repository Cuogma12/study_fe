'use client';

import React from 'react';
import { Text } from '@/shared/components/atoms';

interface AdminAccessFallbackProps {
  loading: boolean;
  isAdmin: boolean;
  loadingLabel: string;
  forbiddenLabel: string;
  children: React.ReactNode;
}

export const AdminAccessFallback = ({
  loading,
  isAdmin,
  loadingLabel,
  forbiddenLabel,
  children,
}: AdminAccessFallbackProps) => {
  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-slate-500">
          {loadingLabel}
        </Text>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <Text variant="body2" className="!text-red-500">
          {forbiddenLabel}
        </Text>
      </main>
    );
  }

  return <>{children}</>;
};
