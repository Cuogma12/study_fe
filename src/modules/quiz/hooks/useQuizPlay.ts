'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { quizService } from '../services/quiz.service';
import { QuizQuestion } from '../types/quiz';

const parseQuestions = (value: string | null): QuizQuestion[] => {
  if (!value) {
    return [];
  }
  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useQuizPlay = () => {
  const t = useTranslations('quiz.play');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const searchParams = useSearchParams();

  const subjectId = searchParams.get('subject_id') ?? '';
  const topicId = searchParams.get('topic_id') ?? '';
  const gradeLevel = searchParams.get('grade_level') ?? '';
  const questions = useMemo(() => parseQuestions(searchParams.get('questions')), [searchParams]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const canSubmit = totalQuestions > 0 && answeredCount === totalQuestions && !submitting;

  const chooseAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setError(null);
  };

  const submitQuiz = async () => {
    if (!canSubmit) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await quizService.submitQuiz({
        subject_id: subjectId,
        topic_id: topicId || undefined,
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

  const backToBuilder = () => {
    router.push('/quiz');
  };

  return {
    t,
    subjectId,
    topicId,
    gradeLevel,
    questions,
    answers,
    answeredCount,
    totalQuestions,
    error,
    submitting,
    canSubmit,
    chooseAnswer,
    submitQuiz,
    backToBuilder,
  };
};
