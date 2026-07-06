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
          className={`h-4 w-4 cursor-pointer rounded border-gray-300 bg-white text-primary transition-colors focus:ring-primary dark:border-slate-700 dark:bg-slate-900 ${className}`}
          {...props}
        />
        <Label htmlFor={id} className="!mb-0 ml-2 cursor-pointer !font-normal">
          {label}
        </Label>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
