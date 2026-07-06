import React from 'react';
import { Button } from '../atoms/Button';
import { MaterialIcon } from '../atoms/icon';
import { Text } from '../atoms/Text';

export interface DismissibleChipProps {
  label: string;
  onDismiss: () => void;
  dismissLabel?: string;
}

export const DismissibleChip = ({
  label,
  onDismiss,
  dismissLabel,
}: DismissibleChipProps) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onDismiss}
    aria-label={dismissLabel ?? label}
    className="!h-auto gap-1 !rounded-full !bg-slate-100 !px-3 !py-1 !text-xs !font-normal !text-slate-700 hover:!bg-slate-200 dark:!bg-slate-800 dark:!text-slate-200 dark:hover:!bg-slate-700"
  >
    <Text as="span" variant="small" className="!font-normal !text-inherit">
      {label}
    </Text>
    <MaterialIcon icon="close" size="text-sm" />
  </Button>
);
