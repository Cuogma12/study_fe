import React, { HTMLAttributes } from 'react';
import { Text } from './Text';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count: number;
}

export const Badge = ({ count, className = '', ...props }: BadgeProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <Text
      as="span"
      variant="small"
      weight="bold"
      className={`flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 !text-[10px] !normal-case !tracking-normal !text-white ${className}`.trim()}
      {...props}
    >
      {count}
    </Text>
  );
};
