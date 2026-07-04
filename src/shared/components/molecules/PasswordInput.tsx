import React from 'react';
import { Input, InputProps } from '@/shared/components/atoms';
import { VisibilityIcon, VisibilityOffIcon } from '@/shared/components/atoms/icon';
import { FIELD_ERROR_STYLES } from '@/shared/utils/fieldErrorStyles';

interface PasswordInputProps extends Omit<InputProps, 'type' | 'hideErrorMessage'> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', error, errorTone = 'required', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const tone = error ? FIELD_ERROR_STYLES[errorTone] : null;

    return (
      <div className="w-full">
        <div className="relative w-full">
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`pr-10 ${className}`}
            error={error}
            errorTone={errorTone}
            hideErrorMessage
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none dark:hover:text-slate-300"
            tabIndex={-1}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <VisibilityOffIcon size={20} /> : <VisibilityIcon size={20} />}
          </button>
        </div>
        {error && <p className={`mt-1.5 text-xs ${tone?.text}`}>{error}</p>}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
