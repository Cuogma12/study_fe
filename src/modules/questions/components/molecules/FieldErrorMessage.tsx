'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { FieldErrorTone } from '@/shared/types/field-error';

interface FieldErrorMessageProps {
  message: string;
  tone?: FieldErrorTone;
}

export const FieldErrorMessage = ({ message, tone = 'required' }: FieldErrorMessageProps) => {
  const isWarning = tone === 'invalid';

  return (
    <div
      className={`mt-1 flex items-center gap-1 ${
        isWarning ? 'text-amber-600' : 'text-rose-500'
      }`}
    >
      <MaterialIcon
        icon={isWarning ? 'warning' : 'error'}
        size="text-base"
        className={isWarning ? 'text-amber-600' : 'text-rose-500'}
      />
      <Text variant="body2" weight="medium" className="!text-inherit">
        {message}
      </Text>
    </div>
  );
};
