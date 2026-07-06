import React from 'react';
import { Button, Text } from '../atoms';

export interface MenuItemProps {
  icon?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tone?: 'default' | 'danger';
  children: React.ReactNode;
  role?: string;
}

export const MenuItem = ({
  icon,
  onClick,
  tone = 'default',
  children,
  role,
}: MenuItemProps) => {
  const toneClass =
    tone === 'danger'
      ? '!text-rose-600 hover:!bg-rose-50 dark:!text-rose-400 dark:hover:!bg-rose-900/30'
      : '!text-slate-700 hover:!bg-primary/10 hover:!text-primary dark:!text-slate-200 dark:hover:!bg-primary/20';

  return (
    <Button
      type="button"
      variant="ghost"
      role={role}
      onClick={onClick}
      className={`!h-auto !w-full !justify-start gap-2 !rounded-none px-3 py-2.5 !text-left !text-sm !font-normal ${toneClass}`}
    >
      {icon}
      <Text as="span" variant="body2" className="!font-normal !text-inherit">
        {children}
      </Text>
    </Button>
  );
};
