import React from 'react';
import { Button } from '../atoms/Button';

export interface ModalBackdropProps {
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export const ModalBackdrop = ({
  onClick,
  ariaLabel,
  className = '',
}: ModalBackdropProps) => (
  <Button
    type="button"
    variant="ghost"
    aria-label={ariaLabel}
    onClick={onClick}
    className={`!absolute !inset-0 !h-full !w-full !rounded-none !bg-slate-900/40 !p-0 backdrop-blur-[1px] hover:!bg-slate-900/50 ${className}`.trim()}
  />
);
