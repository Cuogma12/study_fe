import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HomeFilters } from '@/shared/utils/homeFilterParams';
import { HOME_FEED_PAGE_SIZE } from '../constants/feed';
import { questionService } from '../services/question.service';
import { QuestionListItem } from '../types/question';

const buildFilterKey = (filters: HomeFilters) =>
  JSON.stringify({
    q: filters.q,
    gradeLevel: filters.gradeLevel,
    subjectId: filters.subjectId,
    topicId: filters.topicId,
    status: filters.status,
    sort: filters.sort,
  });

export const useHomeFeed = (filters: HomeFilters) => {
  const [questions, setQuestions] = useState<QuestionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const filterKey = useMemo(() => buildFilterKey(filters), [filters]);

  const fetchPage = useCallback(
    async (page: number, append: boolean) => {
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data = await questionService.getQuestions({
          page,
          limit: HOME_FEED_PAGE_SIZE,
          sort: filters.sort,
          ...(filters.q ? { q: filters.q } : {}),
          ...(filters.subjectId ? { subject_id: filters.subjectId } : {}),
          ...(filters.gradeLevel ? { grade_level: filters.gradeLevel } : {}),
          ...(filters.topicId ? { topic_id: filters.topicId } : {}),
          ...(filters.status ? { status: filters.status } : {}),
        });

        setQuestions((current) =>
          append ? [...current, ...data.items] : data.items
        );
        setHasMore(data.pagination.page < data.pagination.total_pages);
        pageRef.current = page;
      } catch {
        if (!append) {
          setQuestions([]);
          setHasMore(false);
        }
        setError('load_error');
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [
      filters.gradeLevel,
      filters.q,
      filters.sort,
      filters.status,
      filters.subjectId,
      filters.topicId,
    ]
  );

  useEffect(() => {
    pageRef.current = 1;
    void fetchPage(1, false);
  }, [filterKey, fetchPage]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) {
      return;
    }
    void fetchPage(pageRef.current + 1, true);
  }, [fetchPage, hasMore]);

  const removeQuestion = useCallback((questionId: string) => {
    setQuestions((current) => current.filter((item) => item.id !== questionId));
  }, []);

  const updateQuestionSaved = useCallback((questionId: string, saved: boolean) => {
    setQuestions((current) =>
      current.map((item) => (item.id === questionId ? { ...item, is_saved: saved } : item))
    );
  }, []);

  return {
    questions,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    removeQuestion,
    updateQuestionSaved,
  };
};
