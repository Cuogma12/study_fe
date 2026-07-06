'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, IconButton, MaterialIcon, Text } from '../atoms';
import { ModalBackdrop } from './ModalBackdrop';
import { useTranslations } from 'next-intl';

export interface PreviewableImageProps {
  src: string;
  alt?: string;
  frameClassName?: string;
  imageClassName?: string;
  onActivate?: (event: React.MouseEvent) => void;
}

export const PreviewableImage = ({
  src,
  alt = '',
  frameClassName = '',
  imageClassName = '',
  onActivate,
}: PreviewableImageProps) => {
  const t = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleOpen = (event: React.MouseEvent) => {
    onActivate?.(event);
    setOpen(true);
  };

  const lightbox =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={t('image_view')}
          >
            <ModalBackdrop
              onClick={() => setOpen(false)}
              ariaLabel={t('image_close')}
              className="!bg-black/90 hover:!bg-black/90"
            />

            <IconButton
              label={t('image_close')}
              onClick={() => setOpen(false)}
              className="!absolute !right-4 !top-4 !z-10 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20"
            >
              <MaterialIcon icon="close" className="text-2xl" />
            </IconButton>

            <img
              src={src}
              alt={alt}
              className="relative z-10 max-h-[100dvh] max-w-[100vw] object-contain p-4 sm:p-8"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={handleOpen}
        aria-label={t('image_view')}
        className={`group relative !h-auto !w-full !cursor-zoom-in !rounded-xl !border-2 !border-slate-300 !bg-slate-50 !p-2 transition-colors hover:!border-primary/70 hover:!bg-slate-50 dark:!border-slate-600 dark:!bg-slate-800/50 dark:hover:!border-primary/70 ${frameClassName}`.trim()}
      >
        <img
          src={src}
          alt={alt}
          className={`block w-full rounded-lg object-contain ${imageClassName}`.trim()}
          loading="lazy"
        />
        <Text
          as="span"
          variant="small"
          className="pointer-events-none absolute inset-2 flex items-center justify-center rounded-lg bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100"
          aria-hidden
        >
          <MaterialIcon icon="zoom_in" className="text-3xl text-white drop-shadow-md" />
        </Text>
      </Button>

      {lightbox}
    </>
  );
};
