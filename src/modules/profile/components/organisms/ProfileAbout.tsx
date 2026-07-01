'use client';

import React from 'react';
import { Text, Button, MaterialIcon } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

interface ProfileAboutProps {
  bio: string;
  gradeLevel: string;
  email: string;
  createdAt: string;
}

export const ProfileAbout = ({ bio, gradeLevel, email, createdAt }: ProfileAboutProps) => {
  const t = useTranslations();

  return (
    <section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-[#1a1a2e]">
      <Text variant="h3" weight="bold" className="mb-4 !text-slate-900 dark:!text-white">
        {t('profile.about')}
      </Text>

      {bio && (
        <Text variant="body2" className="mb-4 leading-relaxed !text-slate-600 dark:!text-slate-400">
          {bio}
        </Text>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <MaterialIcon icon="work_outline" size={20} className="!text-primary/60" />
          <Text variant="body2" className="!text-slate-500 dark:!text-slate-400">
            {gradeLevel}
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <MaterialIcon icon="email" size={20} className="!text-primary/60" />
          <Text variant="body2" className="!text-slate-500 dark:!text-slate-400">
            {email}
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <MaterialIcon icon="calendar_today" size={20} className="!text-primary/60" />
          <Text variant="body2" className="!text-slate-500 dark:!text-slate-400">
            {new Date(createdAt).toLocaleDateString()}
          </Text>
        </div>
        <div className="flex items-center gap-3 outline outline-2 outline-dashed outline-red-500/80 p-1 rounded">
          <MaterialIcon icon="place" size={20} className="!text-primary/60" />
          <Text variant="body2" className="!text-slate-500 dark:!text-slate-400">
            Hà Nội, Việt Nam
          </Text>
        </div>
        <div className="flex items-center gap-3 outline outline-2 outline-dashed outline-red-500/80 p-1 rounded">
          <MaterialIcon icon="link" size={20} className="!text-primary/60" />
          <a className="text-primary hover:underline text-sm" href="#">github.com/minhtam_ai</a>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="ghost"
          className="flex-1 !rounded-lg !bg-slate-100 py-2 hover:!bg-slate-200 dark:!bg-[#252542]"
        >
          Chỉnh sửa hồ sơ
        </Button>
        <Button
          variant="ghost"
          className="!rounded-lg !bg-slate-100 !p-2 hover:!bg-slate-200 dark:!bg-[#252542]"
        >
          <MaterialIcon icon="share" type="filled" size="text-sm" />
        </Button>
      </div>
    </section>
  );
};

