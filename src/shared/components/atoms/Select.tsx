import React, { SelectHTMLAttributes } from 'react';
import { ExpandMoreIcon } from './icon';
import { FieldErrorTone } from '@/shared/types/field-error';
import { FIELD_ERROR_STYLES } from '@/shared/utils/fieldErrorStyles';

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  /** required = đỏ (chưa chọn), invalid = vàng (giá trị sai) */
  errorTone?: FieldErrorTone;
  hideErrorMessage?: boolean;
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, placeholder, error, errorTone = 'required', hideErrorMessage = false, icon, ...props }, ref) => {
    const tone = error ? FIELD_ERROR_STYLES[errorTone] : null;
    const paddingLeft = icon ? 'pl-12' : 'pl-4';

    const fieldStyles = [
      'flex w-full appearance-none rounded-lg border py-4 pr-10 outline-none transition-all',
      'text-slate-900 dark:text-white',
      tone
        ? tone.field
        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 focus:border-primary focus:ring-1 focus:ring-primary',
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

          <select ref={ref} className={fieldStyles} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            <ExpandMoreIcon size={20} />
          </div>
        </div>

        {error && !hideErrorMessage && <p className={`mt-1.5 text-xs ${tone?.text}`}>{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
