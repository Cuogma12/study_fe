'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import { quizService } from '../services/quiz.service';
import { QuizAttemptListItem, QuizAttemptStatus } from '../types/quiz';

export type QuizMyTab = QuizAttemptStatus;

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

  useEffect(() => {
    setPage(1);
  }, [tab]);

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
        const data = await quizService.getMyAttempts(page, 10, tab);
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

    loadHistory();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, page, tab, t, tApiErrors]);

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
    goToBuilder,
    viewResult,
    continueQuiz,
  };
};
