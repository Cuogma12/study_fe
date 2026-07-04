import React, { InputHTMLAttributes, ReactNode } from 'react';
import { FieldErrorTone } from '@/shared/types/field-error';
import { FIELD_ERROR_STYLES } from '@/shared/utils/fieldErrorStyles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  /** required = đỏ (chưa nhập), invalid = vàng (nhập sai) */
  errorTone?: FieldErrorTone;
  icon?: ReactNode;
  /** Ẩn text lỗi (dùng khi wrapper tự render, vd PasswordInput) */
  hideErrorMessage?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = '', error, errorTone = 'required', icon, hideErrorMessage = false, ...props },
    ref
  ) => {
    const tone = error ? FIELD_ERROR_STYLES[errorTone] : null;
    const paddingLeft = icon ? 'pl-12' : 'pl-4';

    const fieldStyles = [
      'w-full rounded-lg border py-4 pr-4 outline-none transition-all',
      'text-slate-900 dark:text-white placeholder:text-slate-400',
      tone
        ? tone.field
        : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/50 focus:border-primary focus:ring-1 focus:ring-primary',
      paddingLeft,
      className,
    ]
      .join(' ')
      .trim();

    return (
      <div className="w-full">
        <div className="relative w-full">
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input ref={ref} className={fieldStyles} {...props} />
        </div>
        {!hideErrorMessage && error && (
          <p className={`mt-1.5 text-xs ${tone?.text}`}>{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
