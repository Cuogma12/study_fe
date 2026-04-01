import React from 'react';
import { Input, InputProps } from '@/shared/components/atoms';
import { VisibilityIcon, VisibilityOffIcon } from '@/shared/components/atoms/icon';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`pr-10 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-full items-center justify-center text-slate-400 focus:outline-none hover:text-slate-600 dark:hover:text-slate-300"
          tabIndex={-1}
        >
          {showPassword ? <VisibilityOffIcon size={20} /> : <VisibilityIcon size={20} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
