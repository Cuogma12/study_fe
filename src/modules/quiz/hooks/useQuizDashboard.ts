'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { quizService } from '../services/quiz.service';
import { QuizBankItem } from '../types/quiz';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';

const getGradeLabel = (value: string, t: ReturnType<typeof useTranslations>) => {
  if (value === '10') return t('filters.grade_10');
  if (value === '11') return t('filters.grade_11');
  if (value === '12') return t('filters.grade_12');
  return t('card.all_grades');
};

export const useQuizDashboard = () => {
  const t = useTranslations('quiz.dashboard');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const { ready, isAuthenticated } = useRequireAuth();

  const [bankItems, setBankItems] = useState<QuizBankItem[]>([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await quizService.getQuizBank('all');
        if (cancelled) return;
        setBankItems(data.items ?? []);
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

    loadData();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, t, tApiErrors]);

  const subjectOptions = useMemo(() => {
    const map = new Map<string, string>();
    bankItems.forEach((item) => {
      map.set(item.subject_id, item.subject_name);
    });
    return [{ label: t('filters.all_subjects'), value: '' }].concat(
      Array.from(map.entries()).map(([value, label]) => ({ label, value }))
    );
  }, [bankItems, t]);

  const gradeOptions = useMemo(() => {
    const grades = new Set<number>();
    bankItems.forEach((item) => {
      (item.grade_levels || []).forEach((grade) => grades.add(Number(grade)));
    });

    const fixedGrades = [10, 11, 12].filter((grade) => grades.has(grade));

    return [{ label: t('filters.all_grades'), value: '' }].concat(
      fixedGrades.map((grade) => ({
        label: t(`filters.grade_${grade}` as 'filters.grade_10'),
        value: String(grade),
      }))
    );
  }, [bankItems, t]);

  const cards = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return bankItems
      .filter((item) => (subjectFilter ? item.subject_id === subjectFilter : true))
      .filter((item) =>
        gradeFilter ? (item.grade_levels || []).map(Number).includes(Number(gradeFilter)) : true
      )
      .filter((item) =>
        normalizedKeyword
          ? item.topic_name.toLowerCase().includes(normalizedKeyword) ||
            item.subject_name.toLowerCase().includes(normalizedKeyword)
          : true
      )
      .map((item) => ({
        id: `${item.subject_id}-${item.topic_id}`,
        subjectId: item.subject_id,
        subjectName: item.subject_name,
        topicId: item.topic_id,
        topicName: item.topic_name,
        gradeValue: gradeFilter ? Number(gradeFilter) : null,
        gradeText: getGradeLabel(gradeFilter, t),
        questionCount: item.question_count,
      }));
  }, [bankItems, gradeFilter, keyword, subjectFilter, t]);

  const goToBuilder = (subjectId?: string, topicId?: string, gradeValue?: number | null) => {
    const params = new URLSearchParams();
    if (subjectId) params.set('subject_id', subjectId);
    if (topicId) params.set('topic_id', topicId);
    if (gradeValue) params.set('grade_level', String(gradeValue));
    const query = params.toString();
    router.push(query ? `/quiz/new?${query}` : '/quiz/new');
  };

  return {
    t,
    ready,
    isAuthenticated,
    loading,
    error,
    cards,
    keyword,
    subjectFilter,
    gradeFilter,
    subjectOptions,
    gradeOptions,
    setKeyword,
    setSubjectFilter,
    setGradeFilter,
    goToBuilder,
  };
};
