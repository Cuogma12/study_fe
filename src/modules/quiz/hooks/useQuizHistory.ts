'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import { subjectService } from '@/shared/services/subject.service';
import { quizService } from '../services/quiz.service';
import { QuizAttemptListItem, QuizAttemptMode, QuizAttemptStatus } from '../types/quiz';

export type QuizMyTab = QuizAttemptStatus;

const KEYWORD_DEBOUNCE_MS = 350;

export const useQuizHistory = () => {
  const t = useTranslations('quiz.history');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const { ready, isAuthenticated } = useRequireAuth();

  const [tab, setTab] = useState<QuizMyTab>('in_progress');
  const [items, setItems] = useState<QuizAttemptListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [subjectOptions, setSubjectOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, KEYWORD_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    setPage(1);
  }, [tab, debouncedKeyword, subjectFilter, gradeFilter, modeFilter]);

  useEffect(() => {
    if (!ready || !isAuthenticated) {
      return;
    }

    let cancelled = false;

    const loadSubjects = async () => {
      try {
        const subjects = await subjectService.getSubjects();
        if (cancelled) {
          return;
        }
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

    void loadSubjects();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, t]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const isSubmitted = tab === 'submitted';
        const data = await quizService.getMyAttempts({
          page,
          limit: 10,
          status: tab,
          ...(isSubmitted
            ? {
                mode: (modeFilter as QuizAttemptMode) || undefined,
                subject_id: subjectFilter || undefined,
                grade_level: gradeFilter ? Number(gradeFilter) : undefined,
                keyword: debouncedKeyword || undefined,
              }
            : {}),
        });
        if (cancelled) {
          return;
        }
        setItems(data.items ?? []);
        setTotalPages(data.pagination?.total_pages ?? 1);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(resolveApiErrorMessage(err, tApiErrors, t('errors.load_failed')));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadHistory();
    return () => {
      cancelled = true;
    };
  }, [
    ready,
    isAuthenticated,
    page,
    tab,
    modeFilter,
    subjectFilter,
    gradeFilter,
    debouncedKeyword,
    t,
    tApiErrors,
  ]);

  const gradeOptions = useMemo(
    () => [
      { label: t('filters.all_grades'), value: '' },
      { label: t('filters.grade_10'), value: '10' },
      { label: t('filters.grade_11'), value: '11' },
      { label: t('filters.grade_12'), value: '12' },
    ],
    [t]
  );

  const modeOptions = useMemo(
    () => [
      { label: t('filters.all_modes'), value: '' },
      { label: t('filters.mode_practice'), value: 'practice' },
      { label: t('filters.mode_exam'), value: 'exam' },
    ],
    [t]
  );

  const goToBuilder = () => {
    router.push('/quiz/new');
  };

  const viewResult = (attemptId: string) => {
    router.push(`/quiz/attempts/${attemptId}/result`);
  };

  const continueQuiz = (attemptId: string) => {
    router.push(`/quiz/play?attempt_id=${attemptId}`);
  };

  return {
    t,
    ready,
    isAuthenticated,
    tab,
    setTab,
    items,
    loading,
    error,
    page,
    totalPages,
    setPage,
    keyword,
    setKeyword,
    subjectFilter,
    setSubjectFilter,
    gradeFilter,
    setGradeFilter,
    modeFilter,
    setModeFilter,
    subjectOptions,
    gradeOptions,
    modeOptions,
    goToBuilder,
    viewResult,
    continueQuiz,
  };
};
