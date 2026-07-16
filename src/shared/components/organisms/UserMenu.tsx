'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton, MaterialIcon } from '../atoms';
import { MenuItem } from '../molecules/MenuItem';
import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { authService } from '@/modules/auth/services/auth.service';
import {
  profileService,
  ChangePasswordPayload,
} from '@/modules/profile/services/profile.service';
import { ProfileChangePasswordModal } from '@/modules/profile/components/organisms/ProfileChangePasswordModal';
import { getUserAvatarUrl } from '@/shared/utils/getUserAvatarUrl';
import { extractApiErrorCode } from '@/shared/utils/resolveApiErrorMessage';
import { API_ERROR_CODES } from '@/shared/constants/apiErrorCodes';
import { useToast } from '@/shared/components/organisms/ToastProvider';

export const UserMenu = () => {
  const t = useTranslations('home.header');
  const tProfile = useTranslations('profile');
  const { navigateTo } = useAppNavigation();
  const { ready, isAuthenticated, userId } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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
      <IconButton
        label={t('login')}
        onClick={() => navigateTo('/profile')}
        className="!border !border-primary/30 !bg-primary/20 hover:!scale-105 hover:!bg-primary/30 hover:!shadow-md"
      >
        <MaterialIcon icon="person" className="text-primary" size="text-lg" />
      </IconButton>
    );
  }

  const handleLogout = async () => {
    setOpen(false);
    await authService.logout();
  };

  const handleChangePassword = async (payload: ChangePasswordPayload) => {
    if (!userId) return;
    setPasswordSaving(true);
    setPasswordError(null);
    try {
      await profileService.changePassword(userId, payload);
      setPasswordOpen(false);
      toast.success(tProfile('password.success'));
    } catch (err: unknown) {
      const code = extractApiErrorCode(err);
      // Modal tự gắn lỗi + viền đỏ cho ô mật khẩu hiện tại
      if (code !== API_ERROR_CODES.USER.INVALID_OLD_PASSWORD) {
        setPasswordError(tProfile('password.failed'));
      }
      throw err;
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <>
      <div
        ref={rootRef}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen((current) => !current)}
          aria-label={t('profile')}
          aria-expanded={open}
          className="!h-8 !w-8 !overflow-hidden !rounded-full !border !border-primary/30 !bg-slate-100 !p-0 hover:!scale-105 hover:!shadow-md dark:!bg-slate-800"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <MaterialIcon icon="person" className="text-primary" size="text-lg" />
          )}
        </Button>

        {open && (
          <div className="absolute right-0 top-full z-[60] pt-2">
            <div className="min-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <MenuItem
                icon={<MaterialIcon icon="person" size="text-lg" />}
                onClick={() => {
                  setOpen(false);
                  navigateTo('/profile');
                }}
              >
                {t('profile')}
              </MenuItem>
              <MenuItem
                icon={<MaterialIcon icon="lock" size="text-lg" />}
                onClick={() => {
                  setOpen(false);
                  setPasswordError(null);
                  setPasswordOpen(true);
                }}
              >
                {t('change_password')}
              </MenuItem>
              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
              <MenuItem
                icon={<MaterialIcon icon="logout" size="text-lg" />}
                onClick={handleLogout}
                tone="danger"
              >
                {t('logout')}
              </MenuItem>
            </div>
          </div>
        )}
      </div>

      <ProfileChangePasswordModal
        open={passwordOpen}
        saving={passwordSaving}
        error={passwordError}
        onClose={() => {
          if (!passwordSaving) {
            setPasswordOpen(false);
            setPasswordError(null);
          }
        }}
        onSave={handleChangePassword}
      />
    </>
  );
};
