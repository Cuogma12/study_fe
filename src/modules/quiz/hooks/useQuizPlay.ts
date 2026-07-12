'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import { quizService } from '../services/quiz.service';
import { QuizQuestion } from '../types/quiz';

const SECONDS_PER_QUESTION = 180;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const useQuizPlay = () => {
  const t = useTranslations('quiz.play');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, isAuthenticated } = useRequireAuth();

  const attemptId = searchParams.get('attempt_id') ?? '';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [setTitle, setSetTitle] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    if (!attemptId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadAttempt = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await quizService.getAttemptPlay(attemptId);
        if (cancelled) {
          return;
        }
        setQuestions(data.questions ?? []);
        setSetTitle(data.title || data.set_title || '');
        setGradeLevel(data.grade_level ? String(data.grade_level) : '');
        const savedAnswers = Object.fromEntries(
          (data.saved_answers ?? []).map((item) => [item.quiz_question_id, item.selected_answer])
        );
        setAnswers(savedAnswers);
        setSecondsLeft(Math.max((data.questions?.length ?? 0) * SECONDS_PER_QUESTION, 600));
        setCurrentIndex(0);
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

    loadAttempt();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, attemptId, t, tApiErrors]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }
    const timerId = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [questions.length]);

  const persistAnswers = useCallback(
    (nextAnswers: Record<string, string>, questionId: string, option: string) => {
      if (!attemptId) {
        return;
      }
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(async () => {
        try {
          await quizService.saveAttemptAnswers(attemptId, [
            { quiz_question_id: questionId, selected_answer: option },
          ]);
        } catch {
          // Silent fail for autosave; user can still submit all answers at once.
        }
      }, 400);
    },
    [attemptId]
  );

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const canSubmit =
    Boolean(attemptId) && totalQuestions > 0 && answeredCount === totalQuestions && !submitting;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalQuestions - 1;
  const answeredPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const examTitle = useMemo(() => {
    if (setTitle) {
      return setTitle;
    }
    return gradeLevel ? t('exam_title_grade', { grade: gradeLevel }) : t('exam_title_default');
  }, [gradeLevel, setTitle, t]);

  const timeLabel = t('time_remaining', { time: formatTime(secondsLeft) });
  const questionProgressLabel = t('question_progress', {
    current: currentIndex + 1,
    total: totalQuestions,
  });
  const percentLabel = t('percent_complete', { percent: answeredPercent });

  const chooseAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: option };
      persistAnswers(next, questionId, option);
      return next;
    });
    setError(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setError(null);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
    setError(null);
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= totalQuestions) {
      return;
    }
    setCurrentIndex(index);
    setError(null);
  };

  const submitQuiz = async () => {
    if (!canSubmit || !attemptId) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await quizService.submitQuiz({
        attempt_id: attemptId,
        answers: questions.map((question) => ({
          quiz_question_id: question.id,
          selected_answer: answers[question.id],
        })),
      });
      router.push(`/quiz/attempts/${result.attempt_id}/result`);
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('errors.submit_failed')));
    } finally {
      setSubmitting(false);
    }
  };

  const exitQuiz = () => {
    router.push('/quiz/history');
  };

  const backToBuilder = () => {
    router.push('/quiz/new');
  };

  return {
    t,
    ready,
    isAuthenticated,
    attemptId,
    loading,
    gradeLevel,
    questions,
    currentQuestion,
    currentIndex,
    answers,
    answeredCount,
    totalQuestions,
    examTitle,
    timeLabel,
    questionProgressLabel,
    percentLabel,
    answeredPercent,
    error,
    submitting,
    canSubmit,
    canGoPrevious,
    canGoNext,
    chooseAnswer,
    goToPrevious,
    goToNext,
    goToQuestion,
    submitQuiz,
    exitQuiz,
    backToBuilder,
  };
};
