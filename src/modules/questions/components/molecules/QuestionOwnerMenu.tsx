'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IconButton, MaterialIcon } from '@/shared/components/atoms';
import { MenuItem } from '@/shared/components/molecules/MenuItem';
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
      <IconButton
        label={t('more_actions')}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className="!rounded-lg !border !border-transparent hover:!border-slate-300 hover:!bg-slate-50 dark:hover:!border-slate-600 dark:hover:!bg-slate-800"
      >
        <MaterialIcon icon="more_vert" size="text-xl" />
      </IconButton>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-slate-300 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-900"
        >
          <MenuItem
            role="menuitem"
            icon={<MaterialIcon icon="edit" size="text-lg" />}
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
              onEdit();
            }}
          >
            {t('edit')}
          </MenuItem>
          <MenuItem
            role="menuitem"
            icon={<MaterialIcon icon="delete" size="text-lg" />}
            tone="danger"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
              onDelete();
            }}
          >
            {t('delete')}
          </MenuItem>
        </div>
      )}
    </div>
  );
};
