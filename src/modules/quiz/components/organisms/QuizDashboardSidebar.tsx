'use client';

import Link from 'next/link';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useQuizSidebarMenu } from '../../hooks/useQuizSidebarMenu';

export const QuizDashboardSidebar = () => {
  const menus = useQuizSidebarMenu();

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-gray-300 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:flex">
      <nav className="flex flex-col gap-1">
        {menus.map((menu) => (
          <Link
            key={menu.key}
            href={menu.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              menu.isActive
                ? 'bg-indigo-100 text-primary shadow-sm dark:bg-primary/15'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <MaterialIcon icon={menu.icon} />
            <Text
              variant="body2"
              className={`!font-semibold ${menu.isActive ? '!text-primary' : ''}`}
            >
              {menu.label}
            </Text>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
