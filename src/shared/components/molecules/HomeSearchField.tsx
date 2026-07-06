'use client';

import React, { useEffect } from 'react';
import { MaterialIcon, Input } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { useHomeSearch } from '@/shared/hooks/useHomeSearch';

export const HomeSearchField = () => {
  const t = useTranslations('home.header');
  const { draftQ, setDraftQ, submitSearch, handleKeyDown, isHomePage, syncDraftFromUrl } =
    useHomeSearch();

  useEffect(() => {
    if (isHomePage) {
      syncDraftFromUrl();
    }
  }, [isHomePage, syncDraftFromUrl]);

  return (
    <Input
      icon={<MaterialIcon icon="search" />}
      className="!rounded-full !border-none !bg-slate-100 !py-2 !text-sm dark:!bg-slate-800"
      placeholder={t('search_placeholder')}
      type="search"
      value={draftQ}
      onChange={(event) => setDraftQ(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (isHomePage) {
          submitSearch();
        }
      }}
    />
  );
};
