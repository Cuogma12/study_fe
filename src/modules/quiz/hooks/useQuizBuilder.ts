'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { subjectService, Subject } from '@/shared/services/subject.service';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import {
  flattenTopicOptions,
  filterTopicTreeByGrade,
  topicService,
  TopicNode,
} from '@/modules/questions/services/topic.service';
import { quizService } from '../services/quiz.service';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';

const DEFAULT_LIMIT = 10;
const LIMIT_OPTIONS = [5, 10, 15, 20];
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

export const useQuizBuilder = () => {
  const t = useTranslations('quiz.builder');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, isAuthenticated } = useRequireAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [topicsBySubject, setTopicsBySubject] = useState<Record<string, TopicNode[]>>({});
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const subjectFromQuery = searchParams.get('subject_id');
    const topicFromQuery = searchParams.get('topic_id');
    const gradeFromQuery = searchParams.get('grade_level');
    if (subjectFromQuery) {
      setSubjectId(subjectFromQuery);
    }
    if (topicFromQuery) {
      setTopicId(topicFromQuery);
    }
    if (gradeFromQuery) {
      setGradeLevel(gradeFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setSubjectsLoading(false);
      return;
    }

    let cancelled = false;

    const loadInitialData = async () => {
      setSubjectsLoading(true);
      setLoadError(null);
      try {
        const data = await subjectService.getSubjects();
        if (cancelled) {
          return;
        }
        setSubjects(data);
        const topicEntries = await Promise.all(
          data.map(async (subject) => {
            try {
              const topics = await topicService.getBySubject(subject.id);
              return [subject.id, topics] as const;
            } catch {
              return [subject.id, []] as const;
            }
          })
        );
        if (!cancelled) {
          setTopicsBySubject(Object.fromEntries(topicEntries));
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setLoadError(resolveApiErrorMessage(err, tApiErrors, t('errors.load_failed')));
        }
      } finally {
        if (!cancelled) {
          setSubjectsLoading(false);
          setTopicsLoading(false);
        }
      }
    };

    loadInitialData();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, t, tApiErrors]);

  const subjectOptions = useMemo(
    () => subjects.map((item) => ({ label: item.name, value: item.id })),
    [subjects]
  );

  const gradeOptions = useMemo(
    () => [
      { label: t('grade_options.grade_10'), value: '10' },
      { label: t('grade_options.grade_11'), value: '11' },
      { label: t('grade_options.grade_12'), value: '12' },
    ],
    [t]
  );

  const topicOptions = useMemo(() => {
    if (!subjectId || !gradeLevel) {
      return [];
    }
    const tree = topicsBySubject[subjectId] ?? [];
    const filteredTree = filterTopicTreeByGrade(tree, Number(gradeLevel));
    return flattenTopicOptions(filteredTree);
  }, [gradeLevel, subjectId, topicsBySubject]);

  const limitOptions = useMemo(
    () =>
      LIMIT_OPTIONS.map((value) => ({ label: `${value} ${t('question_count_suffix')}`, value })),
    [t]
  );

  const isLimitValid = limit >= MIN_LIMIT && limit <= MAX_LIMIT;
  const canGenerate = Boolean(subjectId && gradeLevel && !submitting && isLimitValid);

  const onSubjectChange = (value: string) => {
    setSubjectId(value);
    setTopicId('');
    setSubmitError(null);
  };

  const onGradeChange = (value: string) => {
    setGradeLevel(value);
    setTopicId('');
    setSubmitError(null);
  };

  const onTopicChange = (value: string) => {
    setTopicId(value);
    setSubmitError(null);
  };

  const onLimitChange = (value: number) => {
    setLimit(value);
    setLimitError(null);
    setSubmitError(null);
  };

  const validateLimit = () => {
    if (!isLimitValid) {
      setLimitError(t('errors.limit_invalid', { min: MIN_LIMIT, max: MAX_LIMIT }));
      return false;
    }
    return true;
  };

  const generateQuiz = async () => {
    if (!canGenerate || !validateLimit()) {
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const generated = await quizService.generateQuiz({
        subject_id: subjectId,
        topic_id: topicId || undefined,
        grade_level: Number(gradeLevel),
        limit,
      });
      router.push(`/quiz/play?attempt_id=${generated.attempt_id}`);
    } catch (err: unknown) {
      setSubmitError(resolveApiErrorMessage(err, tApiErrors, t('errors.generate_failed')));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    t,
    ready,
    isAuthenticated,
    subjectsLoading,
    topicsLoading,
    subjectId,
    topicId,
    gradeLevel,
    limit,
    limitError,
    minLimit: MIN_LIMIT,
    maxLimit: MAX_LIMIT,
    loadError,
    submitError,
    submitting,
    subjectOptions,
    gradeOptions,
    topicOptions,
    limitOptions,
    canGenerate,
    onSubjectChange,
    onGradeChange,
    onTopicChange,
    onLimitChange,
    generateQuiz,
  };
};
