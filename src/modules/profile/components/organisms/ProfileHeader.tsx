'use client';

import React from 'react';
import { Text, MaterialIcon, Tag } from '@/shared/components/atoms';
import { ProfileStatCard } from '@/shared/components/molecules/ProfileStatCard';
import { useTranslations } from 'next-intl';
import { UserProfile } from '../../types/profile';
import { ProfileAvatarMenu } from '../molecules/ProfileAvatarMenu';

interface ProfileHeaderProps {
  profile: UserProfile;
  questionsCount: number;
  savedCount: number;
  avatarUploading?: boolean;
  onChangeAvatar: (dataUrl: string) => Promise<void>;
}

const roleLabel = (role: string) => {
  if (role === 'admin') return 'Admin';
  if (role === 'moderator') return 'Moderator';
  return 'Học sinh';
};

export const ProfileHeader = ({
  profile,
  questionsCount,
  savedCount,
  avatarUploading = false,
  onChangeAvatar,
}: ProfileHeaderProps) => {
  const t = useTranslations('profile');
  const displayName = profile.full_name?.trim() || profile.username;
  const avatarUrl =
    profile.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4848e5&color=fff&size=128`;

  return (
    <section className="rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-900">
      <div className="h-28 overflow-hidden rounded-t-2xl md:h-32">
        <div className="h-full w-full bg-gradient-to-br from-primary via-indigo-500 to-violet-500" />
      </div>

      <div className="relative px-5 pb-6 sm:px-8">
        <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 sm:left-8 sm:translate-x-0 md:-top-12">
          <ProfileAvatarMenu
            avatarUrl={avatarUrl}
            displayName={displayName}
            uploading={avatarUploading}
            onChangeAvatar={onChangeAvatar}
          />
        </div>

        <div className="pt-12 text-center sm:pl-28 sm:pt-3 sm:text-left md:pt-4">
          <Text variant="h3" weight="bold" className="!text-slate-900 dark:!text-white">
            {displayName}
          </Text>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
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

        <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
          <ProfileStatCard label={t('stat_questions')} value={questionsCount} />
          <ProfileStatCard label={t('stat_saved')} value={savedCount} />
        </div>
      </div>
    </section>
  );
};
