'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { subjectService, Subject } from '@/shared/services/subject.service';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { adminService } from '../services/admin.service';
import {
  AdminEditQuizSetFormValues,
  AdminQuizSetItem,
  AdminQuizSetsPagination,
  AdminUpdateQuizSetPayload,
} from '../types/quiz-sets';

const DEFAULT_PAGINATION: AdminQuizSetsPagination = {
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 0,
};

type PublishedFilter = 'all' | 'published' | 'hidden';

export const useAdminQuizSets = () => {
  const t = useTranslations('admin.quiz_sets');
  const tApiErrors = useTranslations('api_errors');
  const [items, setItems] = useState<AdminQuizSetItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [pagination, setPagination] = useState<AdminQuizSetsPagination>(DEFAULT_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [subjectId, setSubjectId] = useState('all');
  const [gradeLevel, setGradeLevel] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState<PublishedFilter>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingSet, setEditingSet] = useState<AdminQuizSetItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadSubjects = async () => {
      setSubjectsLoading(true);
      try {
        const rows = await subjectService.getSubjects();
        if (!cancelled) {
          setSubjects(rows);
        }
      } catch {
        if (!cancelled) {
          setSubjects([]);
        }
      } finally {
        if (!cancelled) {
          setSubjectsLoading(false);
        }
      }
    };
    loadSubjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const isPublished =
          publishedFilter === 'all'
            ? undefined
            : publishedFilter === 'published';

        const data = await adminService.getQuizSets({
          page,
          limit: DEFAULT_PAGINATION.limit,
          keyword: keyword.trim() || undefined,
          subject_id: subjectId === 'all' ? undefined : subjectId,
          grade_level:
            gradeLevel === 'all' ? undefined : Number.parseInt(gradeLevel, 10),
          is_published: isPublished,
        });
        setItems(data.items);
        setPagination(data.pagination);
      } catch (err: unknown) {
        setItems([]);
        setPagination((current) => ({ ...current, total: 0, total_pages: 0 }));
        setError(resolveApiErrorMessage(err, tApiErrors, t('load_error')));
      } finally {
        setLoading(false);
      }
    },
    [gradeLevel, keyword, publishedFilter, subjectId, t, tApiErrors]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const buildUpdatePayload = (
    values: AdminEditQuizSetFormValues
  ): AdminUpdateQuizSetPayload => {
    const durationRaw = values.duration_minutes.trim();
    const orderRaw = values.display_order.trim();

    return {
      title: values.title.trim(),
      description: values.description.trim() ? values.description.trim() : null,
      duration_minutes: durationRaw ? Number.parseInt(durationRaw, 10) : null,
      display_order: orderRaw ? Number.parseInt(orderRaw, 10) : undefined,
      is_published: values.is_published === 'true',
    };
  };

  const saveEditedSet = async (values: AdminEditQuizSetFormValues) => {
    if (!editingSet) return false;

    setUpdatingId(editingSet.id);
    try {
      const updated = await adminService.updateQuizSet(
        editingSet.id,
        buildUpdatePayload(values)
      );
      setItems((current) =>
        current.map((item) => (item.id === editingSet.id ? updated : item))
      );
      return true;
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors, t('edit.save_failed')));
      return false;
    } finally {
      setUpdatingId(null);
    }
  };

  const togglePublished = async (setItem: AdminQuizSetItem) => {
    const nextPublished = !setItem.is_published;
    setUpdatingId(setItem.id);
    try {
      const updated = await adminService.updateQuizSet(setItem.id, {
        is_published: nextPublished,
      });
      setItems((current) =>
        current.map((item) => (item.id === setItem.id ? updated : item))
      );
      return true;
    } catch (err: unknown) {
      setError(
        resolveApiErrorMessage(err, tApiErrors, t('toggle_publish_failed'))
      );
      return false;
    } finally {
      setUpdatingId(null);
    }
  };

  const subjectOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.subject_all') },
      ...subjects.map((subject) => ({ value: subject.id, label: subject.name })),
    ],
    [subjects, t]
  );

  const gradeOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.grade_all') },
      { value: '10', label: t('grades.grade_10') },
      { value: '11', label: t('grades.grade_11') },
      { value: '12', label: t('grades.grade_12') },
    ],
    [t]
  );

  const publishedOptions = useMemo(
    () => [
      { value: 'all', label: t('filters.status_all') },
      { value: 'published', label: t('status.published') },
      { value: 'hidden', label: t('status.hidden') },
    ],
    [t]
  );

  return {
    items,
    subjects,
    subjectsLoading,
    pagination,
    loading,
    error,
    keyword,
    setKeyword,
    subjectId,
    setSubjectId,
    gradeLevel,
    setGradeLevel,
    publishedFilter,
    setPublishedFilter,
    subjectOptions,
    gradeOptions,
    publishedOptions,
    updatingId,
    editingSet,
    setEditingSet,
    onSearch: () => fetchData(1),
    onChangePage: (page: number) => fetchData(page),
    saveEditedSet,
    togglePublished,
  };
};
