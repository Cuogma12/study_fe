import React, { SelectHTMLAttributes } from 'react';
import { ExpandMoreIcon } from './icon';

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, placeholder, error, icon, ...props }, ref) => {
    const baseStyles = 'flex w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-4 pr-10 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all';
    const errorStyles = error ? 'border-rose-500 focus:ring-rose-500' : '';
    const paddingLeft = icon ? 'pl-12' : 'pl-4';

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <select
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${paddingLeft} ${className}`.trim()}
          {...props}
        >
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

        {/* Custom Arrow Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ExpandMoreIcon size={20} />
        </div>

        {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
