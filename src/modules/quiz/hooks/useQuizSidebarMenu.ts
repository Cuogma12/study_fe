'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const useQuizSidebarMenu = () => {
  const t = useTranslations('quiz.dashboard.sidebar');
  const pathname = usePathname();

  const menus = useMemo(
    () => [
      {
        key: 'exam_sets',
        label: t('exam_sets'),
        href: '/quiz',
        icon: 'menu_book',
      },
      {
        key: 'templates',
        label: t('templates'),
        href: '/quiz/new',
        icon: 'tune',
      },
      {
        key: 'history',
        label: t('my_attempts'),
        href: '/quiz/history',
        icon: 'history',
      },
    ],
    [t]
  );

  return menus.map((item) => ({
    ...item,
    isActive:
      item.key === 'exam_sets'
        ? Boolean(pathname?.match(/\/quiz\/?$/))
        : item.key === 'templates'
          ? Boolean(pathname?.includes('/quiz/new'))
          : Boolean(pathname?.includes('/quiz/history')),
  }));
};
