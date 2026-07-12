'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { subjectService } from '@/shared/services/subject.service';
import { quizService } from '../services/quiz.service';
import { QuizSetItem, QuizSetType } from '../types/quiz';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';

const PAGE_SIZE = 12;
const KEYWORD_DEBOUNCE_MS = 350;

const getGradeLabel = (value: number | null, t: ReturnType<typeof useTranslations>) => {
  if (value === 10) return t('filters.grade_10');
  if (value === 11) return t('filters.grade_11');
  if (value === 12) return t('filters.grade_12');
  return t('card.all_grades');
};

export const useQuizDashboard = () => {
  const t = useTranslations('quiz.dashboard');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const { ready, isAuthenticated } = useRequireAuth();

  const [sets, setSets] = useState<QuizSetItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [subjectFilter, setSubjectFilterState] = useState('');
  const [gradeFilter, setGradeFilterState] = useState('');
  const [setTypeFilter, setSetTypeFilterState] = useState('');
  const [keyword, setKeywordState] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [subjectOptions, setSubjectOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startingSetId, setStartingSetId] = useState<string | null>(null);
  const [continueConfirm, setContinueConfirm] = useState<{
    setId: string;
    attemptId: string;
    title: string;
  } | null>(null);

  const loadMoreLockRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, KEYWORD_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    if (!ready || !isAuthenticated) {
      return;
    }

    let cancelled = false;

    const loadSubjects = async () => {
      try {
        const subjects = await subjectService.getSubjects();
        if (cancelled) return;
        setSubjectOptions(
          [{ label: t('filters.all_subjects'), value: '' }].concat(
            subjects.map((item) => ({ label: item.name, value: item.id }))
          )
        );
      } catch {
        if (!cancelled) {
          setSubjectOptions([{ label: t('filters.all_subjects'), value: '' }]);
        }
      }
    };

    loadSubjects();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, t]);

  const fetchPage = useCallback(
    async (pageToLoad: number, append: boolean) => {
      const data = await quizService.getQuizSets({
        page: pageToLoad,
        limit: PAGE_SIZE,
        subject_id: subjectFilter || undefined,
        grade_level: gradeFilter ? Number(gradeFilter) : undefined,
        set_type: (setTypeFilter as QuizSetType) || undefined,
        keyword: debouncedKeyword || undefined,
      });

      const items = data.items ?? [];
      const totalPages = data.pagination?.total_pages ?? 1;

      setSets((prev) => (append ? [...prev, ...items] : items));
      setPage(pageToLoad);
      setHasMore(pageToLoad < totalPages);
    },
    [subjectFilter, gradeFilter, setTypeFilter, debouncedKeyword]
  );

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadFirstPage = async () => {
      setLoading(true);
      setError(null);
      setHasMore(true);
      loadMoreLockRef.current = false;
      try {
        await fetchPage(1, false);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(resolveApiErrorMessage(err, tApiErrors, t('errors.load_failed')));
          setSets([]);
          setHasMore(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadFirstPage();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, fetchPage, t, tApiErrors]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || loadingMore || loadMoreLockRef.current) {
      return;
    }

    loadMoreLockRef.current = true;
    setLoadingMore(true);
    setError(null);
    try {
      await fetchPage(page + 1, true);
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('errors.load_failed')));
    } finally {
      setLoadingMore(false);
      loadMoreLockRef.current = false;
    }
  }, [fetchPage, hasMore, loading, loadingMore, page, t, tApiErrors]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loading) {
      return;
    }

    const scrollRoot =
      (sentinel.closest('.overflow-y-auto') as Element | null) ??
      (sentinel.closest('[class*="overflow-y-auto"]') as Element | null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      {
        root: scrollRoot,
        rootMargin: '240px 0px',
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, loading, sets.length]);

  const cards = useMemo(
    () =>
      sets.map((item) => ({
        id: item.set_id,
        setId: item.set_id,
        title: item.title,
        subjectName: item.subject_name,
        topicName: item.topic_name,
        setType: item.set_type,
        gradeLevel: item.grade_level,
        gradeText: getGradeLabel(item.grade_level, t),
        examYear: item.exam_year,
        questionCount: item.question_count,
        durationMinutes: item.duration_minutes,
        hasInProgress: item.has_in_progress_attempt,
        inProgressAttemptId: item.in_progress_attempt_id,
      })),
    [sets, t]
  );

  const gradeOptions = useMemo(
    () => [
      { label: t('filters.all_grades'), value: '' },
      { label: t('filters.grade_10'), value: '10' },
      { label: t('filters.grade_11'), value: '11' },
      { label: t('filters.grade_12'), value: '12' },
    ],
    [t]
  );

  const setTypeOptions = useMemo(
    () => [
      { label: t('filters.all_set_types'), value: '' },
      { label: t('filters.set_type_midterm'), value: 'midterm' },
      { label: t('filters.set_type_final'), value: 'final' },
      { label: t('filters.set_type_thpt_qg'), value: 'thpt_qg' },
      { label: t('filters.set_type_university_prep'), value: 'university_prep' },
    ],
    [t]
  );

  const startSet = useCallback(
    async (setId: string, inProgressAttemptId?: string | null, setTitle?: string) => {
      if (startingSetId) {
        return;
      }

      if (inProgressAttemptId) {
        setContinueConfirm({
          setId,
          attemptId: inProgressAttemptId,
          title: setTitle ?? '',
        });
        return;
      }

      setStartingSetId(setId);
      setError(null);
      try {
        const started = await quizService.startQuizSet(setId);
        router.push(`/quiz/play?attempt_id=${started.attempt_id}`);
      } catch (err: unknown) {
        setError(resolveApiErrorMessage(err, tApiErrors, t('errors.start_failed')));
      } finally {
        setStartingSetId(null);
      }
    },
    [router, startingSetId, t, tApiErrors]
  );

  const cancelContinue = useCallback(() => {
    if (startingSetId) {
      return;
    }
    setContinueConfirm(null);
  }, [startingSetId]);

  const confirmContinue = useCallback(() => {
    if (!continueConfirm) {
      return;
    }
    const attemptId = continueConfirm.attemptId;
    setContinueConfirm(null);
    setStartingSetId(continueConfirm.setId);
    router.push(`/quiz/play?attempt_id=${attemptId}`);
  }, [continueConfirm, router]);

  return {
    t,
    ready,
    isAuthenticated,
    loading,
    loadingMore,
    hasMore,
    error,
    cards,
    keyword,
    subjectFilter,
    gradeFilter,
    setTypeFilter,
    subjectOptions,
    gradeOptions,
    setTypeOptions,
    startingSetId,
    continueConfirm,
    sentinelRef,
    setKeyword: setKeywordState,
    setSubjectFilter: setSubjectFilterState,
    setGradeFilter: setGradeFilterState,
    setSetTypeFilter: setSetTypeFilterState,
    startSet,
    confirmContinue,
    cancelContinue,
  };
};
