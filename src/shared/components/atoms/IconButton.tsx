import React, { ButtonHTMLAttributes } from 'react';
import { Button } from './Button';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: 'sm' | 'md';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, size = 'sm', className = '', children, ...props }, ref) => {
    const sizeClass = size === 'sm' ? '!h-8 !w-8 !min-w-8' : '!h-10 !w-10 !min-w-10';

    return (
      <Button
        ref={ref}
        type="button"
        variant="ghost"
        size="sm"
        aria-label={label}
        className={`!rounded-full !p-0 ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
