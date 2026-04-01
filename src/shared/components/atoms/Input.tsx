import React, { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, icon, ...props }, ref) => {
    const baseStyles = 'w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 py-4 pr-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400';
    const errorStyles = error ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10 focus:ring-2 focus:ring-rose-500' : '';
    const paddingLeft = icon ? 'pl-12' : 'pl-4';

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${paddingLeft} ${className}`.trim()}
          {...props}
        />
        {error && <span className="text-xs text-rose-500 mt-1.5 block">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
