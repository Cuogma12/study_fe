'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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

const DEFAULT_LIMIT = 10;
const LIMIT_OPTIONS = [5, 10, 15, 20];

export const useQuizBuilder = () => {
  const t = useTranslations('quiz.builder');
  const tApiErrors = useTranslations('api_errors');
  const router = useRouter();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [topicsBySubject, setTopicsBySubject] = useState<Record<string, TopicNode[]>>({});
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      setSubjectsLoading(true);
      setError(null);
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
          setError(resolveApiErrorMessage(err, tApiErrors, t('errors.load_failed')));
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
  }, [t, tApiErrors]);

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
    () => LIMIT_OPTIONS.map((value) => ({ label: `${value} ${t('question_count_suffix')}`, value })),
    [t]
  );

  const canGenerate = Boolean(subjectId && gradeLevel && !submitting);

  const onSubjectChange = (value: string) => {
    setSubjectId(value);
    setTopicId('');
    setError(null);
  };

  const onGradeChange = (value: string) => {
    setGradeLevel(value);
    setTopicId('');
    setError(null);
  };

  const onTopicChange = (value: string) => {
    setTopicId(value);
    setError(null);
  };

  const onLimitChange = (value: number) => {
    setLimit(value);
    setError(null);
  };

  const generateQuiz = async () => {
    if (!canGenerate) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const generated = await quizService.generateQuiz({
        subject_id: subjectId,
        topic_id: topicId || undefined,
        limit,
      });
      const encodedQuestions = encodeURIComponent(JSON.stringify(generated.questions));
      const params = new URLSearchParams({
        subject_id: subjectId,
        grade_level: gradeLevel,
        questions: encodedQuestions,
      });
      if (topicId) {
        params.set('topic_id', topicId);
      }
      router.push(`/quiz/play?${params.toString()}`);
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('errors.generate_failed')));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    t,
    subjectsLoading,
    topicsLoading,
    subjectId,
    topicId,
    gradeLevel,
    limit,
    error,
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
