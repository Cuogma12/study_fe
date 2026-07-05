'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcon } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

interface QuestionOwnerMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
  className?: string;
}

export const QuestionOwnerMenu = ({
  onEdit,
  onDelete,
  disabled = false,
  className = '',
}: QuestionOwnerMenuProps) => {
  const t = useTranslations('question_detail');
  const [open, setOpen] = useState(false);
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

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={rootRef}
      className={`relative shrink-0 ${className}`}
      onClick={stopPropagation}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label={t('more_actions')}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MaterialIcon icon="more_vert" size="text-xl" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-slate-300 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-900"
        >
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <MaterialIcon icon="edit" size="text-lg" />
            {t('edit')}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <MaterialIcon icon="delete" size="text-lg" />
            {t('delete')}
          </button>
        </div>
      )}
    </div>
  );
};
