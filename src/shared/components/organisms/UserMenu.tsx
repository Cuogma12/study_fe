'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcon } from '../atoms';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { authService } from '@/modules/auth/services/auth.service';
import { profileService } from '@/modules/profile/services/profile.service';
import { getUserAvatarUrl } from '@/shared/utils/getUserAvatarUrl';

export const UserMenu = () => {
  const t = useTranslations('home.header');
  const { navigateTo } = useAppNavigation();
  const { ready, isAuthenticated, userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (!ready || !isAuthenticated || !userId) {
      setAvatarUrl(null);
      return;
    }

    let cancelled = false;

    const loadAvatar = async () => {
      try {
        const profile = await profileService.getById(userId);
        if (cancelled) {
          return;
        }
        const displayName = profile.full_name?.trim() || profile.username;
        setAvatarUrl(getUserAvatarUrl(profile.avatar_url, displayName));
      } catch {
        if (!cancelled) {
          setAvatarUrl(null);
        }
      }
    };

    loadAvatar();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, userId]);

  if (!ready) {
    return (
      <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => navigateTo('/profile')}
        className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary/20 transition-all hover:scale-105 hover:bg-primary/30 hover:shadow-md"
        aria-label={t('login')}
      >
        <MaterialIcon icon="person" className="text-primary" size="text-lg" />
      </button>
    );
  }

  const handleLogout = async () => {
    setOpen(false);
    await authService.logout();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-slate-100 transition-all hover:scale-105 hover:shadow-md dark:bg-slate-800"
        aria-label={t('profile')}
        aria-expanded={open}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <MaterialIcon icon="person" className="text-primary" size="text-lg" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[60] pt-2">
          <div className="min-w-[180px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigateTo('/profile');
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-200 dark:hover:bg-primary/20"
            >
              <MaterialIcon icon="person" size="text-lg" />
              {t('profile')}
            </button>
            <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-rose-600 transition-colors hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-900/30"
            >
              <MaterialIcon icon="logout" size="text-lg" />
              {t('logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
