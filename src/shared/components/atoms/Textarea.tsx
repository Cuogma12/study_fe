import React, { TextareaHTMLAttributes } from 'react';
import { FieldErrorTone } from '@/shared/types/field-error';
import { FIELD_ERROR_STYLES } from '@/shared/utils/fieldErrorStyles';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  errorTone?: FieldErrorTone;
  hideErrorMessage?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className = '', error, errorTone = 'required', hideErrorMessage = false, ...props },
    ref
  ) => {
    const tone = error ? FIELD_ERROR_STYLES[errorTone] : null;

    const fieldStyles = [
      'w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition-all',
      'text-slate-900 placeholder:text-slate-400 dark:text-white',
      tone
        ? tone.field
        : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/50 focus:border-primary focus:ring-1 focus:ring-primary',
      className,
    ]
      .join(' ')
      .trim();

    return (
      <div className="w-full">
        <textarea ref={ref} className={fieldStyles} {...props} />
        {error && !hideErrorMessage && (
          <p className={`mt-1.5 text-xs ${tone?.text}`}>{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
