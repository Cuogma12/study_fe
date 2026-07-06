'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  buildHomeFilterQuery,
  DEFAULT_HOME_FILTERS,
  HomeFilters,
  mergeHomeFilters,
  parseHomeFilters,
} from '@/shared/utils/homeFilterParams';

const isHomePathname = (pathname: string): boolean => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length <= 1;
};

export const useHomeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const filters = useMemo(() => parseHomeFilters(searchParams), [searchParams]);
  const isHomePage = useMemo(() => isHomePathname(pathname), [pathname]);
  const homePath = `/${locale}`;

  const navigateWithFilters = useCallback(
    (next: HomeFilters) => {
      const query = buildHomeFilterQuery(next);
      const targetPath = isHomePage ? pathname : homePath;
      const url = query ? `${targetPath}?${query}` : targetPath;
      router.replace(url, { scroll: false });
    },
    [homePath, isHomePage, pathname, router]
  );

  const setFilters = useCallback(
    (partial: Partial<HomeFilters>) => {
      navigateWithFilters(mergeHomeFilters(filters, partial));
    },
    [filters, navigateWithFilters]
  );

  const resetFilters = useCallback(
    (keepQ = false) => {
      const next = keepQ ? { ...DEFAULT_HOME_FILTERS, q: filters.q } : DEFAULT_HOME_FILTERS;
      navigateWithFilters(next);
    },
    [filters.q, navigateWithFilters]
  );

  const toggleGrade = useCallback(
    (grade: number) => {
      const gradeLevel = filters.gradeLevel === grade ? null : grade;
      setFilters({ gradeLevel, topicId: null });
    },
    [filters.gradeLevel, setFilters]
  );

  const toggleSubject = useCallback(
    (subjectId: string) => {
      const nextSubjectId = filters.subjectId === subjectId ? null : subjectId;
      setFilters({ subjectId: nextSubjectId, topicId: null });
    },
    [filters.subjectId, setFilters]
  );

  return {
    filters,
    isHomePage,
    homePath,
    setFilters,
    resetFilters,
    toggleGrade,
    toggleSubject,
  };
};
