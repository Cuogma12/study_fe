'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  buildHomeFilterQuery,
  mergeHomeFilters,
  parseHomeFilters,
} from '@/shared/utils/homeFilterParams';

const isHomePathname = (pathname: string): boolean => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length <= 1;
};

export const useHomeSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const filters = useMemo(() => parseHomeFilters(searchParams), [searchParams]);
  const isHomePage = useMemo(() => isHomePathname(pathname), [pathname]);
  const homePath = `/${locale}`;

  const [draftQ, setDraftQ] = useState(filters.q);

  const syncDraftFromUrl = useCallback(() => {
    setDraftQ(filters.q);
  }, [filters.q]);

  const submitSearch = useCallback(
    (value?: string) => {
      const q = (value ?? draftQ).trim();
      const next = mergeHomeFilters(filters, { q });
      const query = buildHomeFilterQuery(next);
      const url = query ? `${homePath}?${query}` : homePath;
      router.push(url);
    },
    [draftQ, filters, homePath, router]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitSearch();
      }
    },
    [submitSearch]
  );

  return {
    draftQ,
    setDraftQ,
    submitSearch,
    handleKeyDown,
    isHomePage,
    syncDraftFromUrl,
    currentQ: isHomePage ? filters.q : '',
  };
};
