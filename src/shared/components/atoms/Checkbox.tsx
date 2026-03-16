import React, { InputHTMLAttributes } from 'react';
import { Label } from './Label';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, id, error, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 transition-colors cursor-pointer ${className}`}
          {...props}
        />
        <Label htmlFor={id} className="ml-2 !mb-0 !font-normal cursor-pointer">
          {label}
        </Label>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
