'use client';

import React, { useRef } from 'react';
import { MaterialIcon, Text, Select, Button, Badge } from '@/shared/components/atoms';
import { Subject } from '@/shared/services/subject.service';
import { HomeFilters, countAdvancedFilters } from '@/shared/utils/homeFilterParams';
import { useTranslations } from 'next-intl';
import { useIntersectionLoadMore } from '@/shared/hooks/useIntersectionLoadMore';
import { useHomeFeed } from '../../hooks/useHomeFeed';
import { QuestionCard } from '../molecules/QuestionCard';
import { HomeActiveFilterChips } from '../molecules/HomeActiveFilterChips';
import { HomeFilterDrawer } from './HomeFilterDrawer';

interface HomeFeedProps {
  filters: HomeFilters;
  subjects: Subject[];
  filterDrawerOpen: boolean;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onSetFilters: (partial: Partial<HomeFilters>) => void;
}

export const HomeFeed = ({
  filters,
  subjects,
  filterDrawerOpen,
  onFilterDrawerOpenChange,
  onSetFilters,
}: HomeFeedProps) => {
  const t = useTranslations('home.feed');
  const scrollRootRef = useRef<HTMLElement>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  const { questions, loading, loadingMore, error, hasMore, loadMore, removeQuestion, updateQuestionSaved } =
    useHomeFeed(filters);

  useIntersectionLoadMore({
    rootRef: scrollRootRef,
    sentinelRef: loadMoreSentinelRef,
    enabled: !loading && !loadingMore && hasMore && !error,
    onLoadMore: loadMore,
  });

  const advancedFilterCount = countAdvancedFilters(filters);

  const sortOptions = [
    { label: t('sort.newest'), value: 'newest' },
    { label: t('sort.most_viewed'), value: 'most_viewed' },
    { label: t('sort.most_answered'), value: 'most_answered' },
  ];

  const feedTitle = filters.q ? t('searching', { q: filters.q }) : t('latest_questions');

  const handleResetAdvanced = () => {
    onSetFilters({ topicId: null, status: null });
  };

  return (
    <>
      <section
        ref={scrollRootRef}
        className="scrollbar-nice min-h-0 min-w-0 flex-1 overflow-y-auto px-0 py-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="h3" className="min-w-0 truncate">
            {feedTitle}
          </Text>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Select
              value={filters.sort}
              onChange={(event) =>
                onSetFilters({
                  sort: event.target.value as HomeFilters['sort'],
                })
              }
              options={sortOptions}
              className="!w-auto !min-w-[10rem] !py-2 !pr-8 !text-sm"
              hideErrorMessage
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterDrawerOpenChange(true)}
              className="relative flex items-center gap-1.5 !border-slate-200 !bg-white px-3 py-1.5 !text-slate-900 dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100"
            >
              <MaterialIcon icon="filter_list" size="text-lg" />
              {t('filter')}
              <Badge count={advancedFilterCount} className="absolute -right-1 -top-1" />
            </Button>
          </div>
        </div>

        <HomeActiveFilterChips
          filters={filters}
          onSetFilters={onSetFilters}
          onResetAdvanced={handleResetAdvanced}
        />

        <div className="flex flex-col gap-4">
          {loading && (
            <Text variant="body2" className="py-8 text-center !text-slate-500">
              {t('loading')}
            </Text>
          )}

          {!loading && error && (
            <Text variant="body2" className="py-8 text-center !text-red-500">
              {t(error)}
            </Text>
          )}

          {!loading && !error && questions.length === 0 && (
            <Text variant="body2" className="py-8 text-center !text-slate-500">
              {t('empty')}
            </Text>
          )}

          {!loading &&
            !error &&
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onDeleted={removeQuestion}
                onSavedChange={updateQuestionSaved}
              />
            ))}

          {!loading && !error && questions.length > 0 && (
            <div
              ref={loadMoreSentinelRef}
              className="flex min-h-10 items-center justify-center py-2"
            >
              {loadingMore && (
                <Text variant="caption" className="!text-slate-500">
                  {t('loading_more')}
                </Text>
              )}
              {!loadingMore && !hasMore && (
                <Text variant="caption" className="!text-slate-400">
                  {t('end_of_feed')}
                </Text>
              )}
            </div>
          )}
        </div>
      </section>

      <HomeFilterDrawer
        open={filterDrawerOpen}
        filters={filters}
        subjects={subjects}
        onClose={() => onFilterDrawerOpenChange(false)}
        onApply={(partial) => onSetFilters(partial)}
        onReset={() => onSetFilters({ topicId: null, status: null })}
      />
    </>
  );
};
