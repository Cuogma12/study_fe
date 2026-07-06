import React from 'react';
import { Input, InputProps, IconButton, Text } from '@/shared/components/atoms';
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
          <IconButton
            type="button"
            label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="!absolute !right-1 !top-1/2 !h-8 !w-8 !min-w-8 -translate-y-1/2 !text-slate-400 hover:!text-slate-600 dark:hover:!text-slate-300"
          >
            {showPassword ? <VisibilityOffIcon size={20} /> : <VisibilityIcon size={20} />}
          </IconButton>
        </div>
        {error && (
          <Text variant="small" className={`mt-1.5 ${tone?.text}`}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
