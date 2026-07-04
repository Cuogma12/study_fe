'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Select, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { UserProfile } from '../../types/profile';
import { UpdateProfilePayload } from '../../services/profile.service';

interface ProfileEditModalProps {
  profile: UserProfile;
  open: boolean;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (payload: UpdateProfilePayload) => Promise<void>;
}

export const ProfileEditModal = ({
  profile,
  open,
  saving,
  error,
  onClose,
  onSave,
}: ProfileEditModalProps) => {
  const t = useTranslations('profile');
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [gradeLevel, setGradeLevel] = useState(
    profile.grade_level != null ? String(profile.grade_level) : ''
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setFullName(profile.full_name || '');
    setBio(profile.bio || '');
    setGradeLevel(profile.grade_level != null ? String(profile.grade_level) : '');
  }, [open, profile]);

  if (!open) {
    return null;
  }

  const gradeOptions = [
    { label: t('grade_level', { level: 10 }), value: '10' },
    { label: t('grade_level', { level: 11 }), value: '11' },
    { label: t('grade_level', { level: 12 }), value: '12' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      full_name: fullName.trim(),
      bio: bio.trim() || null,
      grade_level: gradeLevel ? Number(gradeLevel) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <Text variant="h5" weight="bold" className="mb-1">
          {t('edit_title')}
        </Text>
        <p className="mb-5 text-sm text-slate-500">{t('edit_desc')}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label>{t('edit_full_name')}</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('edit_full_name_placeholder')}
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t('edit_bio')}</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder={t('edit_bio_placeholder')}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t('edit_grade')}</Label>
            <Select
              options={gradeOptions}
              placeholder={t('edit_grade_placeholder')}
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-rose-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
              {t('edit_cancel')}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? t('edit_saving') : t('edit_save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
