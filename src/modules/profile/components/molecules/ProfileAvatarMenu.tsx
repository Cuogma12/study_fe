'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MaterialIcon } from '@/shared/components/atoms';
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
            <button
              type="button"
              className="absolute inset-0 cursor-zoom-out"
              aria-label={t('avatar_close')}
              onClick={() => setViewOpen(false)}
            />

            <button
              type="button"
              onClick={() => setViewOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              aria-label={t('avatar_close')}
            >
              <MaterialIcon icon="close" className="text-2xl" />
            </button>

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
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          disabled={busy}
          className="group relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t('avatar_alt')}
        >
          <img
            alt={t('avatar_alt')}
            className="h-20 w-20 rounded-full border-[4px] border-white object-cover shadow-md dark:border-slate-900 md:h-24 md:w-24"
            src={avatarUrl}
            referrerPolicy="no-referrer"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
            <MaterialIcon icon="photo_camera" className="text-2xl" />
          </span>
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white">
              <MaterialIcon icon="progress_activity" className="animate-spin text-2xl" />
            </span>
          )}
        </button>

        {menuOpen && (
          <div className="absolute left-1/2 top-full z-20 mt-2 w-44 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-300 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-900 sm:left-0 sm:translate-x-0">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setViewOpen(true);
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-200 dark:hover:bg-primary/20"
            >
              <MaterialIcon icon="visibility" size="text-lg" />
              {t('avatar_view')}
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-200 dark:hover:bg-primary/20"
            >
              <MaterialIcon icon="upload" size="text-lg" />
              {t('avatar_change')}
            </button>
            {error && (
              <p className="border-t border-slate-100 px-3 py-2 text-xs text-rose-500 dark:border-slate-700">
                {error}
              </p>
            )}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePickFile}
        />
      </div>

      {lightbox}
    </>
  );
};
