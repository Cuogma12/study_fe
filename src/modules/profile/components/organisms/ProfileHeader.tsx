'use client';

import React from 'react';
import { Text, MaterialIcon, Tag } from '@/shared/components/atoms';
import { ProfileStatCard } from '@/shared/components/molecules/ProfileStatCard';
import { useTranslations } from 'next-intl';
import { UserProfile } from '../../types/profile';
import { ProfileAvatarMenu } from '../molecules/ProfileAvatarMenu';

export type ProfileStats = {
  questionsCount: number;
  savedCount: number;
  quizDoneCount: number;
  quizAvgScore: number | null;
};

interface ProfileHeaderProps {
  profile: UserProfile;
  stats: ProfileStats;
  avatarUploading?: boolean;
  onChangeAvatar: (dataUrl: string) => Promise<void>;
}

const roleLabel = (role: string) => {
  if (role === 'admin') return 'Admin';
  return 'Học sinh';
};

export const ProfileHeader = ({
  profile,
  stats,
  avatarUploading = false,
  onChangeAvatar,
}: ProfileHeaderProps) => {
  const t = useTranslations('profile');
  const displayName = profile.full_name?.trim() || profile.username;
  const avatarUrl =
    profile.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4848e5&color=fff&size=128`;

  const avgDisplay =
    stats.quizAvgScore == null ? '—' : Number.isInteger(stats.quizAvgScore)
      ? String(stats.quizAvgScore)
      : stats.quizAvgScore.toFixed(1);

  return (
    <section className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm dark:border-slate-600 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="mx-auto shrink-0 sm:mx-0">
          <ProfileAvatarMenu
            avatarUrl={avatarUrl}
            displayName={displayName}
            uploading={avatarUploading}
            onChangeAvatar={onChangeAvatar}
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <Text variant="h3" weight="bold" className="!text-slate-900 dark:!text-white">
            {displayName}
          </Text>
          <Text variant="body2" className="mt-1 !text-slate-500 dark:!text-slate-400">
            @{profile.username}
          </Text>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Tag
              className="!rounded-full !bg-primary/10 !px-3 !py-1 !text-xs !font-semibold !text-primary"
              icon={<MaterialIcon icon="verified" size="text-sm" />}
            >
              {roleLabel(profile.role)}
            </Tag>
            {profile.grade_level != null && (
              <Tag
                className="!rounded-full !bg-slate-100 !px-3 !py-1 !text-xs !font-medium !text-slate-600 dark:!bg-slate-800 dark:!text-slate-300"
                icon={<MaterialIcon icon="school" size="text-sm" />}
              >
                {t('grade_level', { level: profile.grade_level })}
              </Tag>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ProfileStatCard label={t('stat_questions')} value={stats.questionsCount} />
        <ProfileStatCard label={t('stat_saved')} value={stats.savedCount} />
        <ProfileStatCard label={t('stat_quiz_done')} value={stats.quizDoneCount} />
        <ProfileStatCard label={t('stat_quiz_avg')} value={avgDisplay} />
      </div>
    </section>
  );
};
