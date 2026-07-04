'use client';

import React from 'react';
import { Button, Text, MaterialIcon } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useTranslations } from 'next-intl';
import { useProfilePage } from '../hooks/useProfilePage';
import { ProfileHeader } from '../components/organisms/ProfileHeader';
import { ProfileAbout } from '../components/organisms/ProfileAbout';
import { ProfileActivity } from '../components/organisms/ProfileActivity';
import { ProfileEditModal } from '../components/organisms/ProfileEditModal';

export const ProfilePage = () => {
  const t = useTranslations('profile');
  const { navigateTo } = useAppNavigation();
  const {
    ready,
    isAuthenticated,
    profile,
    myQuestions,
    savedQuestions,
    loading,
    listLoading,
    tab,
    setTab,
    error,
    editOpen,
    setEditOpen,
    saving,
    avatarUploading,
    editError,
    setEditError,
    updateProfile,
    changeAvatar,
  } = useProfilePage();

  if (!ready || (isAuthenticated && loading)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <MaterialIcon icon="progress_activity" className="animate-spin text-4xl text-primary" />
        <Text variant="body2" className="!text-slate-500">
          {t('loading')}
        </Text>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 to-indigo-500/10 text-primary shadow-inner">
          <MaterialIcon icon="person" className="text-4xl" />
        </div>
        <Text variant="h4" weight="bold" className="mb-2">
          {t('login_required_title')}
        </Text>
        <Text variant="body2" className="mb-8 !text-slate-500">
          {t('login_required_desc')}
        </Text>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => navigateTo('/login')} className="sm:min-w-[140px]">
            {t('go_login')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigateTo('/register')}
            className="sm:min-w-[140px]"
          >
            {t('go_register')}
          </Button>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-900/20">
          <MaterialIcon icon="error" className="text-3xl" />
        </div>
        <Text variant="body1" className="!text-slate-700 dark:!text-slate-200">
          {t(error === 'load_error' ? 'load_error' : 'not_found')}
        </Text>
        <Button variant="outline" size="sm" onClick={() => navigateTo('/')}>
          {t('back_home')}
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <ProfileHeader
        profile={profile}
        questionsCount={myQuestions.length}
        savedCount={savedQuestions.length}
        avatarUploading={avatarUploading}
        onChangeAvatar={changeAvatar}
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <ProfileAbout
            profile={profile}
            onEdit={() => {
              setEditError(null);
              setEditOpen(true);
            }}
          />
        </div>
        <div className="lg:col-span-8">
          <ProfileActivity
            tab={tab}
            onTabChange={setTab}
            myQuestions={myQuestions}
            savedQuestions={savedQuestions}
            loading={listLoading}
          />
        </div>
      </div>

      <ProfileEditModal
        profile={profile}
        open={editOpen}
        saving={saving}
        error={
          editError
            ? editError === 'update_failed'
              ? t('update_failed')
              : editError
            : null
        }
        onClose={() => {
          if (!saving) {
            setEditOpen(false);
            setEditError(null);
          }
        }}
        onSave={async (payload) => {
          await updateProfile(payload);
        }}
      />
    </main>
  );
};
