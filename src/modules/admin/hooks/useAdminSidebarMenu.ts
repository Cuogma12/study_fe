'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface AdminSidebarMenuItem {
  key: string;
  label: string;
  href: string;
  isActive: boolean;
}

export const useAdminSidebarMenu = () => {
  const t = useTranslations('admin.shell');
  const pathname = usePathname();

  const menus: AdminSidebarMenuItem[] = useMemo(() => {
    const items = [
      {
        key: 'login-history',
        label: t('menu_login_history'),
        href: '/admin/login-history',
      },
      {
        key: 'users',
        label: t('menu_users'),
        href: '/admin/users',
      },
    ];

    return items.map((item) => ({
      ...item,
      isActive: Boolean(pathname?.includes(item.href)),
    }));
  }, [pathname, t]);

  return {
    brandTitle: t('brand_title'),
    brandSubtitle: t('brand_subtitle'),
    homeLabel: t('back_home'),
    menus,
  };
};
