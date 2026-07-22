'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, Select, Text, Textarea } from '@/shared/components/atoms';
import { ModalBackdrop } from '@/shared/components/molecules/ModalBackdrop';
import { AdminEditQuizSetFormValues, AdminQuizSetItem } from '../../types/quiz-sets';

interface AdminEditQuizSetModalProps {
  quizSet: AdminQuizSetItem | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: AdminEditQuizSetFormValues) => Promise<boolean>;
}

export const AdminEditQuizSetModal = ({
  quizSet,
  saving,
  onClose,
  onSave,
}: AdminEditQuizSetModalProps) => {
  const t = useTranslations('admin.quiz_sets.edit');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isPublished, setIsPublished] = useState<'true' | 'false'>('true');

  useEffect(() => {
    if (!quizSet) return;
    setTitle(quizSet.title ?? '');
    setDescription(quizSet.description ?? '');
    setDurationMinutes(
      quizSet.duration_minutes != null ? String(quizSet.duration_minutes) : ''
    );
    setDisplayOrder(
      quizSet.display_order != null ? String(quizSet.display_order) : '0'
    );
    setIsPublished(quizSet.is_published ? 'true' : 'false');
  }, [quizSet]);

  if (!quizSet) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ok = await onSave({
      title,
      description,
      duration_minutes: durationMinutes,
      display_order: displayOrder,
      is_published: isPublished,
    });
    if (ok) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <ModalBackdrop onClick={onClose} ariaLabel={t('cancel')} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
        <Text variant="h4" className="!mb-1">
          {t('title')}
        </Text>
        <Text variant="body2" className="!mb-4 !text-slate-500">
          {t('subtitle')}
        </Text>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('fields.title')}
            </Text>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required disabled={saving} />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('fields.description')}
            </Text>
            <Textarea
              value={description}
              rows={3}
              disabled={saving}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Text as="label" variant="small" className="!mb-1 !block !font-medium">
                {t('fields.duration_minutes')}
              </Text>
              <Input
                type="number"
                min={1}
                value={durationMinutes}
                disabled={saving}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder={t('fields.duration_placeholder')}
              />
            </div>
            <div>
              <Text as="label" variant="small" className="!mb-1 !block !font-medium">
                {t('fields.display_order')}
              </Text>
              <Input
                type="number"
                min={0}
                value={displayOrder}
                disabled={saving}
                onChange={(e) => setDisplayOrder(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('fields.status')}
            </Text>
            <Select
              options={[
                { value: 'true', label: t('status_published') },
                { value: 'false', label: t('status_hidden') },
              ]}
              value={isPublished}
              disabled={saving}
              onChange={(e) => setIsPublished(e.target.value as 'true' | 'false')}
              className="!py-2.5"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={saving} onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? t('saving') : t('save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
