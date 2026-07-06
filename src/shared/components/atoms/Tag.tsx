import React, { HTMLAttributes } from 'react';
import { Text } from './Text';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
}

export const Tag = ({ children, className = '', icon, ...props }: TagProps) => (
  <Text
    as="span"
    variant="small"
    weight="bold"
    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 !text-xs !font-bold !uppercase !tracking-normal ${className}`.trim()}
    {...props}
  >
    {icon}
    {children}
  </Text>
);
