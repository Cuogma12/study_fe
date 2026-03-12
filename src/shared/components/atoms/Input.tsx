import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400';
    const errorStyles = error ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10 focus:ring-2 focus:ring-rose-500' : '';
    
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`.trim()}
          {...props}
        />
        {error && <span className="text-xs text-rose-500 mt-1.5 block">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
