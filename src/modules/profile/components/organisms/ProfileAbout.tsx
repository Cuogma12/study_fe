'use client';

import React from 'react';
import { Button, Text, MaterialIcon } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { UserProfile } from '../../types/profile';

interface ProfileAboutProps {
  profile: UserProfile;
  onEdit: () => void;
}

const InfoRow = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <MaterialIcon icon={icon} size="text-lg" />
    </div>
    <div className="min-w-0 flex-1 pt-1.5 text-sm leading-snug text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </div>
);

export const ProfileAbout = ({ profile, onEdit }: ProfileAboutProps) => {
  const t = useTranslations('profile');

  return (
    <section className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm dark:border-slate-600 dark:bg-slate-900 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <MaterialIcon icon="person" className="text-primary" />
        <Text variant="body1" weight="bold" className="!text-slate-900 dark:!text-white">
          {t('about')}
        </Text>
      </div>

      <Text
        variant="body2"
        className={`mb-5 !leading-relaxed ${
          profile.bio?.trim() ? '!text-slate-600 dark:!text-slate-300' : 'italic !text-slate-400'
        }`}
      >
        {profile.bio?.trim() || t('no_bio')}
      </Text>

      <div className="mb-5 space-y-3.5 rounded-xl border border-gray-300 bg-slate-50 p-3.5 dark:border-slate-600 dark:bg-slate-800/50">
        <InfoRow icon="mail">{profile.email}</InfoRow>

        {profile.grade_level != null && (
          <InfoRow icon="school">{t('grade_level', { level: profile.grade_level })}</InfoRow>
        )}

        <InfoRow icon="calendar_month">
          {t('joined_at', {
            date: new Date(profile.created_at).toLocaleDateString('vi-VN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          })}
        </InfoRow>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        className="flex w-full items-center justify-center gap-1.5"
      >
        <MaterialIcon icon="edit" size="text-sm" />
        {t('edit_profile')}
      </Button>
    </section>
  );
};
