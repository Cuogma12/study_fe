import React, { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300 ${className}`.trim()}
        {...props}
      >
        {children}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';
