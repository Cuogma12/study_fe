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
        key: 'bank',
        label: t('my_quizzes'),
        href: '/quiz',
        icon: 'quiz',
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
      item.key === 'history'
        ? Boolean(pathname?.includes('/quiz/history'))
        : Boolean(pathname?.match(/\/quiz\/?$/)),
  }));
};
