'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { quizService } from '../services/quiz.service';
import { QuizBankItem } from '../types/quiz';

type QuizDashboardCard = {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  gradeValue: number | null;
  gradeText: string;
  questionCount: number;
};

const getGradeLabel = (value: string, t: ReturnType<typeof useTranslations>) => {
  if (value === '10') return t('filters.grade_10');
  if (value === '11') return t('filters.grade_11');
  if (value === '12') return t('filters.grade_12');
  return t('card.all_grades');
};

export const useQuizDashboard = () => {
  const t = useTranslations('quiz.dashboard');
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: 'my-quizzes' | 'overview' =
    searchParams.get('tab') === 'my-quizzes' ? 'my-quizzes' : 'overview';

  const [bankItems, setBankItems] = useState<QuizBankItem[]>([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await quizService.getQuizBank(activeTab === 'my-quizzes' ? 'my' : 'all');
        if (cancelled) return;
        setBankItems(data.items ?? []);
      } catch {
        if (!cancelled) {
          setError(t('errors.load_failed'));
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
  }, [activeTab, t]);

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

  const goToOverview = () => {
    router.push('/quiz');
  };

  const goToMyQuizzes = () => {
    router.push('/quiz?tab=my-quizzes');
  };

  const goToDashboard = () => {
    if (activeTab === 'my-quizzes') {
      goToMyQuizzes();
      return;
    }
    goToOverview();
  };

  const overviewStats = useMemo(
    () => [
      { icon: 'task_alt', value: '142', label: t('overview.stats.total_quizzes') },
      { icon: 'speed', value: '8.5', label: t('overview.stats.avg_score') },
      { icon: 'stars', value: '2,450', label: t('overview.stats.total_points') },
      {
        icon: 'local_fire_department',
        value: '12',
        label: t('overview.stats.streak_days'),
        tone: 'primary' as const,
      },
    ],
    [t]
  );

  const historyItems = useMemo(
    () => [
      {
        title: 'Dai so 12 - Chuong 1',
        submittedAt: t('overview.history.today_time'),
        scoreText: '9.5/10',
        passed: true,
      },
      {
        title: 'Vat ly dai cuong - Dong luc hoc',
        submittedAt: t('overview.history.yesterday'),
        scoreText: '8.0/10',
        passed: true,
      },
      {
        title: 'Tieng Anh - Unit 4 Vocabulary',
        submittedAt: t('overview.history.days_ago', { count: 2 }),
        scoreText: '4.5/10',
        passed: false,
      },
    ],
    [t]
  );

  const masteryItems = useMemo(
    () => [
      { name: 'Toan hoc', percent: 85 },
      { name: 'Vat ly', percent: 72 },
      { name: 'Tieng Anh', percent: 60 },
      { name: 'Hoa hoc', percent: 92 },
    ],
    []
  );

  return {
    t,
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
    activeTab,
    goToOverview,
    goToMyQuizzes,
    overviewStats,
    historyItems,
    masteryItems,
    goToDashboard,
    goToBuilder,
  };
};
