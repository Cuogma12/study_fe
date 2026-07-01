'use client';

import React from 'react';
import { useProfilePage } from '@/modules/profile/hooks/useProfilePage';
import { Button, Text, MaterialIcon } from '@/shared/components/atoms';
import { SchoolIcon } from '@/shared/components/atoms/icon';
import { ProfileHeader } from '../components/organisms/ProfileHeader';
import { ProfileAbout } from '../components/organisms/ProfileAbout';
import { ProfileAchievements } from '../components/organisms/ProfileAchievements';
import { ProfileFeed } from '../components/organisms/ProfileFeed';
import { ProfileStats } from '../components/organisms/ProfileStats';
import { ProfileSkills } from '../components/organisms/ProfileSkills';
import { ProfileSuggestions } from '../components/organisms/ProfileSuggestions';

export const ProfilePage = () => {
  const { t, profile, loading } = useProfilePage();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Text variant="body1">Loading...</Text>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Text variant="body1">Profile not found</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <SchoolIcon size={20} className="text-primary" />
            </div>
            <div>
              <Text variant="h6" weight="bold" className="!text-slate-900 dark:!text-white">
                {t('common.app_name')}
              </Text>
              <Text variant="caption" className="!text-slate-500 dark:!text-slate-400">
                {t('profile.subtitle')}
              </Text>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="hidden items-center rounded-full border border-primary/5 bg-slate-100 px-4 py-1.5 md:flex dark:bg-slate-800">
              {t('profile.search_placeholder')}
            </div>
            <Button variant="ghost" size="sm">
              <MaterialIcon icon="notifications" size={20} />
            </Button>
            <div className="h-9 w-9 overflow-hidden rounded-full border border-primary/20 bg-slate-200">
              <img
                alt={t('profile.avatar_alt')}
                className="h-full w-full object-cover"
                src={
                  profile.avatar_url ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(profile.full_name) +
                    '&background=ffffff&color=4848e5'
                }
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileHeader
          fullName={profile.full_name}
          avatarUrl={
            profile.avatar_url ||
            'https://ui-avatars.com/api/?name=' +
              encodeURIComponent(profile.full_name) +
              '&background=ffffff&color=4848e5'
          }
          role={profile.role}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-3">
            <ProfileAbout
              bio={profile.bio}
              gradeLevel={profile.grade_level}
              email={profile.email}
              createdAt={profile.created_at}
            />
            <ProfileAchievements />
          </div>

          <div className="space-y-6 lg:col-span-6">
            <ProfileFeed
              avatarUrl={
                profile.avatar_url ||
                'https://ui-avatars.com/api/?name=' +
                  encodeURIComponent(profile.full_name) +
                  '&background=ffffff&color=4848e5'
              }
            />
          </div>

          <div className="space-y-6 lg:col-span-3">
            <ProfileStats />
            <ProfileSkills />
            <ProfileSuggestions />
          </div>
        </div>
      </main>
    </div>
  );
};
