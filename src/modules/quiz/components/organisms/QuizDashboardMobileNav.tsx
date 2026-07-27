'use client';

import Link from 'next/link';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useQuizSidebarMenu } from '../../hooks/useQuizSidebarMenu';

export const QuizDashboardMobileNav = () => {
  const menus = useQuizSidebarMenu();

  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 xl:hidden">
      {menus.map((menu) => (
        <Link
          key={menu.key}
          href={menu.href}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
            menu.isActive
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          <MaterialIcon icon={menu.icon} size="text-base" />
          <Text as="span" variant="small" className="whitespace-nowrap !font-semibold">
            {menu.label}
          </Text>
        </Link>
      ))}
    </nav>
  );
};
