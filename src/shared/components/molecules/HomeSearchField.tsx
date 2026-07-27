'use client';

import React, { Suspense, useEffect } from 'react';
import { MaterialIcon, Input, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { useHomeSearch } from '@/shared/hooks/useHomeSearch';

interface HomeSearchFieldProps {
  className?: string;
  inputClassName?: string;
  /** Sidebar hẹp — placeholder ngắn + padding gọn */
  compact?: boolean;
  showLabel?: boolean;
}

const HomeSearchFieldInner = ({
  className = '',
  inputClassName = '',
  compact = false,
  showLabel = false,
}: HomeSearchFieldProps) => {
  const tHeader = useTranslations('home.header');
  const tSidebar = useTranslations('home.sidebar');
  const { draftQ, setDraftQ, submitSearch, handleKeyDown, isHomePage, syncDraftFromUrl } =
    useHomeSearch();

  useEffect(() => {
    if (isHomePage) {
      syncDraftFromUrl();
    }
  }, [isHomePage, syncDraftFromUrl]);

  return (
    <div className={`min-w-0 w-full ${className}`.trim()}>
      {showLabel && (
        <Text variant="caption" className="mb-3 block text-slate-400">
          {tSidebar('search')}
        </Text>
      )}
      <Input
        icon={<MaterialIcon icon="search" size={compact ? 'text-lg' : undefined} />}
        className={[
          '!min-w-0 !rounded-xl !border !border-slate-200 !bg-slate-50 !text-sm dark:!border-slate-600 dark:!bg-slate-800/60',
          compact ? '!py-2 !pl-9 !pr-2' : '!py-2.5',
          inputClassName,
        ]
          .join(' ')
          .trim()}
        placeholder={compact ? tSidebar('search_placeholder') : tHeader('search_placeholder')}
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
    </div>
  );
};

/** Wrapper Suspense vì hook đọc searchParams. */
export const HomeSearchField = (props: HomeSearchFieldProps) => (
  <Suspense
    fallback={
      <div className={`min-w-0 w-full ${props.className ?? ''}`.trim()}>
        <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" aria-hidden />
      </div>
    }
  >
    <HomeSearchFieldInner {...props} />
  </Suspense>
);
