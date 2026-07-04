'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { subjectService, Subject } from '@/shared/services/subject.service';
import { FieldError } from '@/shared/types/field-error';
import { questionService } from '../services/question.service';
import {
  flattenTopicOptions,
  filterTopicTreeByGrade,
  topicService,
  TopicNode,
} from '../services/topic.service';

export type CreateQuestionField =
  | 'subject_id'
  | 'topic_id'
  | 'grade_level'
  | 'title'
  | 'content';

type FormState = {
  subject_id: string;
  topic_id: string;
  grade_level: string;
  title: string;
  content: string;
  images: string[];
};

type FieldErrors = Partial<Record<CreateQuestionField, FieldError>>;

const MAX_IMAGES = 10;

const initialForm: FormState = {
  subject_id: '',
  topic_id: '',
  grade_level: '',
  title: '',
  content: '',
  images: [],
};

const requiredError = (message: string): FieldError => ({ message, tone: 'required' });

export const useCreateQuestion = (isAuthenticated: boolean) => {
  const router = useRouter();
  const t = useTranslations('create_question');

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<CreateQuestionField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [topicsBySubject, setTopicsBySubject] = useState<Record<string, TopicNode[]>>({});
  const [topicsPrefetching, setTopicsPrefetching] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const gradeOptions = useMemo(
    () => [
      { label: t('grades.grade_10'), value: '10' },
      { label: t('grades.grade_11'), value: '11' },
      { label: t('grades.grade_12'), value: '12' },
    ],
    [t]
  );

  const subjectOptions = useMemo(
    () => subjects.map((s) => ({ label: s.name, value: s.id })),
    [subjects]
  );

  useEffect(() => {
    let cancelled = false;

    const loadSubjectsAndTopics = async () => {
      setSubjectsLoading(true);
      setTopicsPrefetching(true);
      try {
        const data = await subjectService.getSubjects();
        if (cancelled) {
          return;
        }
        setSubjects(data);

        const entries = await Promise.all(
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
          setTopicsBySubject(Object.fromEntries(entries));
        }
      } catch {
        if (!cancelled) {
          setSubjects([]);
          setTopicsBySubject({});
        }
      } finally {
        if (!cancelled) {
          setSubjectsLoading(false);
          setTopicsPrefetching(false);
        }
      }
    };

    loadSubjectsAndTopics();
    return () => {
      cancelled = true;
    };
  }, []);

  const topicOptions = useMemo(() => {
    if (!form.subject_id || !form.grade_level) {
      return [];
    }

    const tree = topicsBySubject[form.subject_id];
    if (!tree?.length) {
      return [];
    }

    const filtered = filterTopicTreeByGrade(tree, Number(form.grade_level));
    return flattenTopicOptions(filtered);
  }, [form.subject_id, form.grade_level, topicsBySubject]);

  const topicsLoading =
    topicsPrefetching ||
    Boolean(form.subject_id && !topicsBySubject[form.subject_id] && !topicsPrefetching);

  const validateField = (field: CreateQuestionField, state: FormState): FieldError | undefined => {
    switch (field) {
      case 'subject_id':
        if (!state.subject_id) {
          return requiredError(t('errors.subject_required'));
        }
        return undefined;

      case 'grade_level':
        if (!state.grade_level) {
          return requiredError(t('errors.grade_required'));
        }
        return undefined;

      case 'topic_id':
        return undefined;

      case 'title':
        if (!state.title.trim()) {
          return requiredError(t('errors.title_required'));
        }
        return undefined;

      case 'content':
        if (!state.content.trim()) {
          return requiredError(t('errors.content_required'));
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (state: FormState): FieldErrors => {
    const next: FieldErrors = {};
    (['subject_id', 'grade_level', 'title', 'content'] as CreateQuestionField[]).forEach(
      (field) => {
        const err = validateField(field, state);
        if (err) {
          next[field] = err;
        }
      }
    );
    return next;
  };

  const showError = (field: CreateQuestionField) =>
    Boolean(errors[field] && (touched[field] || submitted));

  const isFormValid = useMemo(() => {
    return Object.keys(validateAll(form)).length === 0;
  }, [form]);

  const isDirty = useMemo(() => {
    return (
      form.subject_id !== '' ||
      form.topic_id !== '' ||
      form.grade_level !== '' ||
      form.title.trim() !== '' ||
      form.content.trim() !== '' ||
      form.images.length > 0
    );
  }, [form]);

  const errorSummaryItems = useMemo(() => {
    if (!submitted) {
      return [];
    }
    const items: string[] = [];
    if (errors.subject_id?.tone === 'required') {
      items.push(t('summary.subject'));
    }
    if (errors.grade_level?.tone === 'required') {
      items.push(t('summary.grade'));
    }
    if (errors.title) {
      items.push(t('summary.title'));
    }
    if (errors.content) {
      items.push(t('summary.content'));
    }
    return items;
  }, [submitted, errors, t]);

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'subject_id' || field === 'grade_level') {
        next.topic_id = '';
      }

      const fieldKey = field as CreateQuestionField;
      if (touched[fieldKey] || submitted) {
        setErrors((prevErrors) => {
          const nextErrors = { ...prevErrors };
          const err = validateField(fieldKey, next);
          if (err) {
            nextErrors[fieldKey] = err;
          } else {
            delete nextErrors[fieldKey];
          }
          return nextErrors;
        });
      }

      return next;
    });
    setSubmitError(null);
  };

  const handleBlur = (field: CreateQuestionField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) {
        next[field] = err;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const addImage = (url: string) => {
    setForm((prev) => {
      if (prev.images.length >= MAX_IMAGES) {
        return prev;
      }
      return { ...prev, images: [...prev.images, url] };
    });
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageError(null);
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      return;
    }

    setSubmitted(true);
    setSubmitError(null);

    const nextErrors = validateAll(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        content: form.content.trim(),
        subject_id: form.subject_id,
        grade_level: Number(form.grade_level),
        ...(form.topic_id ? { topic_id: form.topic_id } : {}),
        ...(form.images.length > 0 ? { images: form.images } : {}),
      };

      const created = await questionService.create(payload);
      router.push(`/questions/${created.id}`);
    } catch {
      setSubmitError(t('errors.submit_failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (!window.confirm(t('cancel_confirm'))) {
        return;
      }
    }
    router.push('/');
  };

  return {
    t,
    form,
    errors,
    showError,
    submitted,
    submitting,
    submitError,
    isFormValid,
    isDirty,
    errorSummaryItems,
    subjectsLoading,
    subjectOptions,
    topicOptions,
    topicsLoading,
    gradeOptions,
    imageUploading,
    setImageUploading,
    imageError,
    setImageError,
    setField,
    handleBlur,
    addImage,
    removeImage,
    handleSubmit,
    handleCancel,
    maxImages: MAX_IMAGES,
  };
};
