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
import { QUIZ_BUILDER_TEMPLATE_DEFS } from '../constants/quizBuilderTemplates';
import { findTopicIdBySlug } from '../utils/findTopicBySlug';
import { QuizAttemptListItem } from '../types/quiz';

const DEFAULT_LIMIT = 10;
const LIMIT_OPTIONS = [5, 10, 15, 20];
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

const buildAutoTitle = (
  subjectName: string | undefined,
  topicName: string | undefined,
  gradeLevel: string
) => {
  const parts = [subjectName].filter(Boolean) as string[];
  if (topicName) {
    parts.push(topicName);
  }
  if (gradeLevel) {
    parts.push(`Lớp ${gradeLevel}`);
  }
  return parts.join(' · ');
};

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
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTemplateKey, setActiveTemplateKey] = useState<string | null>(null);
  const [recentAttempts, setRecentAttempts] = useState<QuizAttemptListItem[]>([]);

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
        const [data, attemptPage] = await Promise.all([
          subjectService.getSubjects(),
          quizService.getMyAttempts(1, 50).catch(() => null),
        ]);
        if (cancelled) {
          return;
        }
        setSubjects(data);
        if (attemptPage?.items) {
          setRecentAttempts(attemptPage.items);
        }
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
    () =>
      subjects
        .filter((item) => (topicsBySubject[item.id]?.length ?? 0) > 0)
        .map((item) => ({ label: item.name, value: item.id })),
    [subjects, topicsBySubject]
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

  const autoTitle = useMemo(() => {
    const subjectName = subjects.find((item) => item.id === subjectId)?.name;
    const topicName = topicOptions.find((item) => item.value === topicId)?.label?.replace(/^—+\s*/, '');
    return buildAutoTitle(subjectName, topicName, gradeLevel);
  }, [subjects, subjectId, topicOptions, topicId, gradeLevel]);

  const similarAttemptCount = useMemo(() => {
    if (!subjectId || !gradeLevel) {
      return 0;
    }
    return recentAttempts.filter(
      (item) =>
        item.subject_id === subjectId &&
        (item.topic_id ?? '') === (topicId || '') &&
        String(item.grade_level ?? '') === gradeLevel
    ).length;
  }, [recentAttempts, subjectId, topicId, gradeLevel]);

  const titleDuplicateHint =
    similarAttemptCount > 0 && (!title.trim() || title.trim() === autoTitle)
      ? t('title_duplicate_hint', { count: similarAttemptCount })
      : null;

  const templateItems = useMemo(() => {
    return QUIZ_BUILDER_TEMPLATE_DEFS.map((def) => {
      const subject = subjects.find((item) => item.slug === def.subjectSlug);
      const matchedTopicId =
        subject && def.topicSlug
          ? findTopicIdBySlug(topicsBySubject[subject.id] ?? [], def.topicSlug)
          : null;
      const available = Boolean(subject && (!def.topicSlug || matchedTopicId));

      return {
        key: def.key,
        subjectSlug: def.subjectSlug,
        topicSlug: def.topicSlug,
        gradeLevel: def.gradeLevel,
        limit: def.limit,
        icon: def.icon,
        subjectId: subject?.id ?? '',
        topicId: matchedTopicId ?? '',
        available,
        title: t(`templates.${def.key}.title`),
        description: t(`templates.${def.key}.description`),
        metaText: t('templates.meta', {
          grade: def.gradeLevel,
          count: def.limit,
        }),
      };
    });
  }, [subjects, topicsBySubject, t]);

  const applyTemplate = (templateKey: string) => {
    const template = templateItems.find((item) => item.key === templateKey);
    if (!template || !template.available) {
      return;
    }
    setSubjectId(template.subjectId);
    setGradeLevel(String(template.gradeLevel));
    setTopicId(template.topicId);
    setLimit(template.limit);
    setTitle(template.title);
    setLimitError(null);
    setSubmitError(null);
    setActiveTemplateKey(templateKey);
  };

  const isLimitValid = limit >= MIN_LIMIT && limit <= MAX_LIMIT;
  const canGenerate = Boolean(subjectId && gradeLevel && !submitting && isLimitValid);

  const onSubjectChange = (value: string) => {
    setSubjectId(value);
    setTopicId('');
    setSubmitError(null);
    setActiveTemplateKey(null);
  };

  const onGradeChange = (value: string) => {
    setGradeLevel(value);
    setTopicId('');
    setSubmitError(null);
    setActiveTemplateKey(null);
  };

  const onTopicChange = (value: string) => {
    setTopicId(value);
    setSubmitError(null);
    setActiveTemplateKey(null);
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
    setSubmitError(null);
    setActiveTemplateKey(null);
  };

  const onLimitChange = (value: number) => {
    setLimit(value);
    setLimitError(null);
    setSubmitError(null);
    setActiveTemplateKey(null);
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
        title: title.trim() || undefined,
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
    title,
    autoTitle,
    titleDuplicateHint,
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
    templateItems,
    activeTemplateKey,
    applyTemplate,
    onSubjectChange,
    onGradeChange,
    onTopicChange,
    onTitleChange,
    onLimitChange,
    generateQuiz,
  };
};
