'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { AdminSidebarMenu } from '../molecules/AdminSidebarMenu';
import { useAdminSidebarMenu } from '../../hooks/useAdminSidebarMenu';

interface AdminShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AdminMobileHomeLink = () => {
  const { homeLabel } = useAdminSidebarMenu();
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      {homeLabel}
    </Link>
  );
};

export const AdminShell = ({ title, description, children }: AdminShellProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <AdminSidebarMenu />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-4 lg:hidden">
            <AdminMobileHomeLink />
          </div>
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
