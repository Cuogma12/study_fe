'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@/shared/components/atoms';
import { AdminAccessFallback } from '../components/molecules/AdminAccessFallback';
import { AdminPaginationBar } from '../components/molecules/AdminPaginationBar';
import { AdminQuizSetsFilters } from '../components/molecules/AdminQuizSetsFilters';
import { AdminEditQuizSetModal } from '../components/organisms/AdminEditQuizSetModal';
import { AdminQuizSetsTable } from '../components/organisms/AdminQuizSetsTable';
import { AdminShell } from '../components/organisms/AdminShell';
import { useAdminAccess } from '../hooks/useAdminAccess';
import { useAdminQuizSets } from '../hooks/useAdminQuizSets';

export const AdminQuizSetsPage = () => {
  const t = useTranslations('admin.quiz_sets');
  const { ready, isAdmin } = useAdminAccess();
  const {
    items,
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
    subjectsLoading,
    updatingId,
    editingSet,
    setEditingSet,
    onSearch,
    onChangePage,
    saveEditedSet,
    togglePublished,
  } = useAdminQuizSets();

  const handleTogglePublished = async (setItem: typeof items[number]) => {
    const confirmText = setItem.is_published
      ? t('confirm.hide')
      : t('confirm.show');
    if (!window.confirm(confirmText)) return;
    await togglePublished(setItem);
  };

  return (
    <AdminAccessFallback
      loading={!ready}
      isAdmin={isAdmin}
      loadingLabel={t('loading')}
      forbiddenLabel={t('forbidden')}
    >
      <AdminShell title={t('title')} description={t('description')}>
        <AdminQuizSetsFilters
          keyword={keyword}
          subjectId={subjectId}
          gradeLevel={gradeLevel}
          publishedFilter={publishedFilter}
          subjectOptions={subjectOptions}
          gradeOptions={gradeOptions}
          publishedOptions={publishedOptions}
          subjectsLoading={subjectsLoading}
          onKeywordChange={setKeyword}
          onSubjectChange={setSubjectId}
          onGradeChange={setGradeLevel}
          onPublishedChange={(value) =>
            setPublishedFilter(value as typeof publishedFilter)
          }
          onApply={onSearch}
        />

        {error ? (
          <Text variant="body2" className="mt-3 !text-red-500">
            {error}
          </Text>
        ) : null}

        <div className="mt-4">
          <AdminQuizSetsTable
            items={items}
            loading={loading}
            updatingId={updatingId}
            onEdit={setEditingSet}
            onTogglePublished={handleTogglePublished}
          />
        </div>

        <AdminPaginationBar
          summary={t('pagination.summary', {
            page: pagination.page,
            total_pages: pagination.total_pages,
            total: pagination.total,
          })}
          page={pagination.page}
          totalPages={pagination.total_pages}
          loading={loading}
          prevLabel={t('pagination.prev')}
          nextLabel={t('pagination.next')}
          onPrev={() => onChangePage(pagination.page - 1)}
          onNext={() => onChangePage(pagination.page + 1)}
        />

        <AdminEditQuizSetModal
          quizSet={editingSet}
          saving={updatingId === editingSet?.id}
          onClose={() => setEditingSet(null)}
          onSave={saveEditedSet}
        />
      </AdminShell>
    </AdminAccessFallback>
  );
};
