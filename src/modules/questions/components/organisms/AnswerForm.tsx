'use client';

import React, { useState } from 'react';
import { Button, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

interface AnswerFormProps {
  placeholder?: string;
  submitLabel?: string;
  disabled?: boolean;
  minLength: number;
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  compact?: boolean;
}

export const AnswerForm = ({
  placeholder,
  submitLabel,
  disabled,
  minLength,
  onSubmit,
  onCancel,
  compact = false,
}: AnswerFormProps) => {
  const t = useTranslations('question_detail');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (trimmed.length < minLength) {
      setError(t('content_too_short', { min: minLength }));
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setContent('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'submit_error';
      setError(t(message === 'content_too_short' ? 'content_too_short' : 'submit_error', {
        min: minLength,
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${compact ? '' : ''}`}
    >
      {!compact && (
        <Text variant="body2" weight="bold" className="mb-3">
          {t('write_answer')}
        </Text>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={disabled || submitting}
        rows={compact ? 3 : 4}
        placeholder={placeholder ?? t('answer_placeholder')}
        className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      <div className="mt-3 flex items-center justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={submitting}>
            {t('cancel')}
          </Button>
        )}
        <Button type="submit" size="sm" disabled={disabled || submitting}>
          {submitting ? t('submitting') : submitLabel ?? t('submit_answer')}
        </Button>
      </div>
    </form>
  );
};
