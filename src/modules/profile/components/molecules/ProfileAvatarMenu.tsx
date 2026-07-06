'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, IconButton, MaterialIcon, Text } from '@/shared/components/atoms';
import { HiddenFileInput } from '@/shared/components/molecules/HiddenFileInput';
import { MenuItem } from '@/shared/components/molecules/MenuItem';
import { ModalBackdrop } from '@/shared/components/molecules/ModalBackdrop';
import { useTranslations } from 'next-intl';
import { uploadToCloudinary } from '@/shared/services/cloudinary.service';

interface ProfileAvatarMenuProps {
  avatarUrl: string;
  displayName: string;
  uploading?: boolean;
  onChangeAvatar: (imageUrl: string) => Promise<void>;
}

export const ProfileAvatarMenu = ({
  avatarUrl,
  displayName,
  uploading = false,
  onChangeAvatar,
}: ProfileAvatarMenuProps) => {
  const t = useTranslations('profile');
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localUploading, setLocalUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const busy = uploading || localUploading;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (!viewOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setViewOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [viewOpen]);

  const handlePickFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError(t('avatar_change_failed'));
      return;
    }

    setError(null);
    setLocalUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file, 'avatars');
      await onChangeAvatar(imageUrl);
      setMenuOpen(false);
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      if (code === 'cloudinary_not_configured') {
        setError(t('avatar_not_configured'));
      } else {
        setError(t('avatar_change_failed'));
      }
    } finally {
      setLocalUploading(false);
    }
  };

  const lightbox =
    viewOpen && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label={t('avatar_view')}
          >
            <ModalBackdrop
              onClick={() => setViewOpen(false)}
              ariaLabel={t('avatar_close')}
              className="!bg-black/90 hover:!bg-black/90"
            />

            <IconButton
              label={t('avatar_close')}
              onClick={() => setViewOpen(false)}
              className="!absolute !right-4 !top-4 !z-10 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20"
            >
              <MaterialIcon icon="close" className="text-2xl" />
            </IconButton>

            <img
              alt={displayName}
              src={avatarUrl}
              className="relative z-10 max-h-[100dvh] max-w-[100vw] object-contain p-4 sm:p-8"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={rootRef} className="relative">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setMenuOpen((open) => !open)}
          disabled={busy}
          aria-label={t('avatar_alt')}
          className="group relative !h-auto !rounded-full !p-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <img
            alt={t('avatar_alt')}
            className="h-20 w-20 rounded-full border-[4px] border-white object-cover shadow-md dark:border-slate-900 md:h-24 md:w-24"
            src={avatarUrl}
            referrerPolicy="no-referrer"
          />
          <Text
            as="span"
            variant="small"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100"
          >
            <MaterialIcon icon="photo_camera" className="text-2xl" />
          </Text>
          {busy && (
            <Text
              as="span"
              variant="small"
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white"
            >
              <MaterialIcon icon="progress_activity" className="animate-spin text-2xl" />
            </Text>
          )}
        </Button>

        {menuOpen && (
          <div className="absolute left-1/2 top-full z-20 mt-2 w-44 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-300 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-900 sm:left-0 sm:translate-x-0">
            <MenuItem
              icon={<MaterialIcon icon="visibility" size="text-lg" />}
              onClick={() => {
                setMenuOpen(false);
                setViewOpen(true);
              }}
            >
              {t('avatar_view')}
            </MenuItem>
            <MenuItem
              icon={<MaterialIcon icon="upload" size="text-lg" />}
              onClick={() => fileRef.current?.click()}
            >
              {t('avatar_change')}
            </MenuItem>
            {error && (
              <Text
                variant="small"
                className="border-t border-slate-100 px-3 py-2 !text-rose-500 dark:border-slate-700"
              >
                {error}
              </Text>
            )}
          </div>
        )}

        <HiddenFileInput ref={fileRef} accept="image/*" onChange={handlePickFile} />
      </div>

      {lightbox}
    </>
  );
};
