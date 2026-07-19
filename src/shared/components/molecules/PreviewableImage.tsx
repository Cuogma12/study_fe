'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, IconButton, Image, MaterialIcon } from '../atoms';
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
    event.preventDefault();
    event.stopPropagation();
    onActivate?.(event);
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };

  const lightbox =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={t('image_view')}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <ModalBackdrop
              onClick={handleClose}
              ariaLabel={t('image_close')}
              className="!bg-black/90 hover:!bg-black/90"
            />

            <IconButton
              label={t('image_close')}
              onMouseDown={handleClose}
              onClick={handleClose}
              className="!absolute !right-4 !top-4 !z-10 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20"
            >
              <MaterialIcon icon="close" className="text-2xl" />
            </IconButton>

            <Image
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
        className={`!h-auto !w-full !cursor-pointer !rounded-xl !border-2 !border-gray-300 !bg-slate-50 !p-2 transition-colors hover:!border-primary dark:!border-slate-600 dark:!bg-slate-800/50 dark:hover:!border-primary ${frameClassName}`.trim()}
      >
        <Image
          src={src}
          alt={alt}
          className={`block w-full rounded-lg object-contain ${imageClassName}`.trim()}
        />
      </Button>

      {lightbox}
    </>
  );
};
