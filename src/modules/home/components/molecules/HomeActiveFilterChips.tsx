'use client';

import React from 'react';
import { Text, TextLink } from '@/shared/components/atoms';
import { DismissibleChip } from '@/shared/components/molecules/DismissibleChip';
import { HomeFilters } from '@/shared/utils/homeFilterParams';
import { useTranslations } from 'next-intl';

interface HomeActiveFilterChipsProps {
  filters: HomeFilters;
  onSetFilters: (partial: Partial<HomeFilters>) => void;
  onResetAdvanced: () => void;
}

export const HomeActiveFilterChips = ({
  filters,
  onSetFilters,
  onResetAdvanced,
}: HomeActiveFilterChipsProps) => {
  const t = useTranslations('home.feed');

  if (!filters.topicId && !filters.status) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Text variant="caption" className="!text-slate-500">
        {t('active_filters')}
      </Text>

      {filters.status && (
        <DismissibleChip
          label={
            filters.status === 'open'
              ? t('filter_drawer.status_open')
              : t('filter_drawer.status_closed')
          }
          dismissLabel={t('remove_filter')}
          onDismiss={() => onSetFilters({ status: null })}
        />
      )}

      {filters.topicId && (
        <DismissibleChip
          label={t('filter_chip_topic')}
          dismissLabel={t('remove_filter')}
          onDismiss={() => onSetFilters({ topicId: null })}
        />
      )}

      <TextLink onClick={onResetAdvanced} className="!text-xs !font-medium">
        {t('filter_drawer.reset')}
      </TextLink>
    </div>
  );
};
