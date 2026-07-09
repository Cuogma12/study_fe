'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { quizService } from '../services/quiz.service';
import { QuizAttemptResult } from '../types/quiz';

export const useQuizResult = (attemptId: string) => {
  const t = useTranslations('quiz.result');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();

  const [result, setResult] = useState<QuizAttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await quizService.getAttemptResult(attemptId);
        if (!cancelled) {
          setResult(data);
        }
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

    if (attemptId) {
      loadResult();
    }

    return () => {
      cancelled = true;
    };
  }, [attemptId, t, tApiErrors]);

  const retry = () => {
    router.refresh();
  };

  const startNewQuiz = () => {
    router.push('/quiz/new');
  };

  return {
    t,
    result,
    loading,
    error,
    retry,
    startNewQuiz,
  };
};
