'use client';

import React from 'react';
import { Text } from '@/shared/components/atoms';
import { AdminSidebarMenu } from '../molecules/AdminSidebarMenu';

interface AdminShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AdminShell = ({ title, description, children }: AdminShellProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <AdminSidebarMenu />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
            <Text variant="h3" className="!font-black tracking-tight">
              {title}
            </Text>
            <Text variant="body2" className="mt-1 !text-slate-500">
              {description}
            </Text>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
};
