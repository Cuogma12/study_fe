'use client';

import React from 'react';
import { Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

export const AdminSidebarMenu = () => {
  const t = useTranslations('admin.shell');

  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 p-6">
        <Text variant="h4" className="!font-bold">
          {t('brand_title')}
        </Text>
        <Text variant="body2" className="mt-1 !text-slate-500">
          {t('brand_subtitle')}
        </Text>
      </div>

      <nav className="flex-1 p-4">
        <div className="rounded-lg bg-indigo-50 px-3 py-2 font-medium text-indigo-700">
          {t('menu_login_history')}
        </div>
      </nav>
    </aside>
  );
};
