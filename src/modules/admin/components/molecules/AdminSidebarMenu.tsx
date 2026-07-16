'use client';

import React from 'react';
import { Text } from '@/shared/components/atoms';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useAdminSidebarMenu } from '../../hooks/useAdminSidebarMenu';

export const AdminSidebarMenu = () => {
  const locale = useLocale();
  const { brandTitle, brandSubtitle, homeLabel, menus } = useAdminSidebarMenu();

  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 p-6">
        <Text variant="h4" className="!font-bold">
          {brandTitle}
        </Text>
        <Text variant="body2" className="mt-1 !text-slate-500">
          {brandSubtitle}
        </Text>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.key}
              href={`/${locale}${menu.href}`}
              className={`block rounded-lg px-3 py-2 font-medium transition-colors ${
                menu.isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link
          href={`/${locale}`}
          className="block rounded-lg px-3 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          {homeLabel}
        </Link>
      </div>
    </aside>
  );
};
