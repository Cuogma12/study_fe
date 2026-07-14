'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage, extractApiErrorCode } from '@/shared/utils/resolveApiErrorMessage';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import { quizService } from '../services/quiz.service';
import { QuizAttemptMode, QuizQuestion, QuizSavedAnswer } from '../types/quiz';

export interface QuizRevealState {
  is_correct: boolean;
  correct_answer: string;
  explanation: string | null;
}

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
  const [mode, setMode] = useState<QuizAttemptMode>('exam');
  const [setTitle, setSetTitle] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reveals, setReveals] = useState<Record<string, QuizRevealState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [deadlineAt, setDeadlineAt] = useState<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const autoSubmitLockRef = useRef(false);

  const isPractice = mode === 'practice';

  const goToResult = useCallback(
    (id: string) => {
      router.push(`/quiz/attempts/${id}/result`);
    },
    [router]
  );

  const applySavedAnswers = useCallback((saved: QuizSavedAnswer[] | undefined) => {
    const nextAnswers: Record<string, string> = {};
    const nextReveals: Record<string, QuizRevealState> = {};
    for (const item of saved ?? []) {
      nextAnswers[item.quiz_question_id] = item.selected_answer;
      if (item.revealed && item.correct_answer != null && typeof item.is_correct === 'boolean') {
        nextReveals[item.quiz_question_id] = {
          is_correct: item.is_correct,
          correct_answer: item.correct_answer,
          explanation: item.explanation ?? null,
        };
      }
    }
    setAnswers(nextAnswers);
    setReveals(nextReveals);
  }, []);

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
      autoSubmitLockRef.current = false;
      try {
        const data = await quizService.getAttemptPlay(attemptId);
        if (cancelled) {
          return;
        }
        if (data.timed_out) {
          goToResult(data.attempt_id);
          return;
        }
        const nextMode: QuizAttemptMode = data.mode === 'practice' ? 'practice' : 'exam';
        setMode(nextMode);
        setQuestions(data.questions ?? []);
        setSetTitle(data.title || data.set_title || '');
        setGradeLevel(data.grade_level ? String(data.grade_level) : '');
        applySavedAnswers(data.saved_answers);
        if (nextMode === 'exam') {
          const remaining = data.remaining_seconds ?? 0;
          setSecondsLeft(remaining);
          setDeadlineAt(Date.now() + remaining * 1000);
        } else {
          setSecondsLeft(0);
          setDeadlineAt(null);
        }
        setCurrentIndex(0);
      } catch (err: unknown) {
        if (!cancelled) {
          const code = extractApiErrorCode(err);
          if (code === 'STD_QIZ_016' || code === 'STD_QIZ_009') {
            goToResult(attemptId);
            return;
          }
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
  }, [ready, isAuthenticated, attemptId, t, tApiErrors, goToResult, applySavedAnswers]);

  const submitOnTimeout = useCallback(async () => {
    if (!attemptId || autoSubmitLockRef.current || submitting || isPractice) {
      return;
    }
    autoSubmitLockRef.current = true;
    setSubmitting(true);
    try {
      const play = await quizService.getAttemptPlay(attemptId);
      if (play.timed_out) {
        goToResult(play.attempt_id);
        return;
      }
      if (typeof play.remaining_seconds === 'number' && play.remaining_seconds > 0) {
        setSecondsLeft(play.remaining_seconds);
        setDeadlineAt(Date.now() + play.remaining_seconds * 1000);
        autoSubmitLockRef.current = false;
        return;
      }
      goToResult(attemptId);
    } catch (err: unknown) {
      const code = extractApiErrorCode(err);
      if (code === 'STD_QIZ_016' || code === 'STD_QIZ_009') {
        goToResult(attemptId);
        return;
      }
      goToResult(attemptId);
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, submitting, goToResult, isPractice]);

  useEffect(() => {
    if (isPractice || !deadlineAt || !questions.length) {
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.floor((deadlineAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        void submitOnTimeout();
      }
    };

    tick();
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [deadlineAt, questions.length, submitOnTimeout, isPractice]);

  const persistAnswers = useCallback(
    (questionId: string, option: string) => {
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
        } catch (err: unknown) {
          const code = extractApiErrorCode(err);
          if (code === 'STD_QIZ_016') {
            goToResult(attemptId);
          }
        }
      }, 400);
    },
    [attemptId, goToResult]
  );

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentReveal = currentQuestion ? reveals[currentQuestion.id] : undefined;
  const currentSelected = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canCheckCurrent =
    isPractice &&
    Boolean(currentQuestion && currentSelected && !currentReveal && !checking && !submitting);
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

  const timeLabel = isPractice
    ? t('practice_mode_label')
    : t('time_remaining', { time: formatTime(secondsLeft) });
  const questionProgressLabel = t('question_progress', {
    current: currentIndex + 1,
    total: totalQuestions,
  });
  const percentLabel = t('percent_complete', { percent: answeredPercent });

  const chooseAnswer = (questionId: string, option: string) => {
    if (submitting || checking) {
      return;
    }
    if (!isPractice && secondsLeft <= 0) {
      return;
    }
    if (reveals[questionId]) {
      return;
    }
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: option };
      persistAnswers(questionId, option);
      return next;
    });
    setError(null);
  };

  const checkCurrentAnswer = async () => {
    if (!canCheckCurrent || !attemptId || !currentQuestion || !currentSelected) {
      return;
    }
    setChecking(true);
    setError(null);
    try {
      const result = await quizService.checkAnswer(attemptId, {
        quiz_question_id: currentQuestion.id,
        selected_answer: currentSelected,
      });
      setAnswers((prev) => ({
        ...prev,
        [result.quiz_question_id]: result.selected_answer,
      }));
      setReveals((prev) => ({
        ...prev,
        [result.quiz_question_id]: {
          is_correct: result.is_correct,
          correct_answer: result.correct_answer,
          explanation: result.explanation,
        },
      }));
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('errors.check_failed')));
    } finally {
      setChecking(false);
    }
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
      goToResult(result.attempt_id);
    } catch (err: unknown) {
      const code = extractApiErrorCode(err);
      if (code === 'STD_QIZ_016' || code === 'STD_QIZ_009') {
        goToResult(attemptId);
        return;
      }
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
    mode,
    isPractice,
    gradeLevel,
    questions,
    currentQuestion,
    currentIndex,
    answers,
    reveals,
    currentReveal,
    answeredCount,
    totalQuestions,
    examTitle,
    timeLabel,
    questionProgressLabel,
    percentLabel,
    answeredPercent,
    error,
    submitting,
    checking,
    canSubmit,
    canCheckCurrent,
    canGoPrevious,
    canGoNext,
    chooseAnswer,
    checkCurrentAnswer,
    goToPrevious,
    goToNext,
    goToQuestion,
    submitQuiz,
    exitQuiz,
    backToBuilder,
  };
};
