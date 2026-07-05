'use client';

import React, { useState } from 'react';
import { Button, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';
import { API_ERROR_CODES } from '@/shared/constants/apiErrorCodes';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { composeTextareaClass } from '../../constants/detailPanelStyles';

interface AnswerFormProps {
  placeholder?: string;
  submitLabel?: string;
  disabled?: boolean;
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  compact?: boolean;
}

export const AnswerForm = ({
  placeholder,
  submitLabel,
  disabled,
  onSubmit,
  onCancel,
  compact = false,
}: AnswerFormProps) => {
  const t = useTranslations('question_detail');
  const tApiErrors = useTranslations('api_errors');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setError(
        resolveApiErrorMessage(API_ERROR_CODES.VALIDATION.CONTENT_REQUIRED, tApiErrors)
      );
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setContent('');
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-0'}>
      {!compact && (
        <>
          <Text variant="body2" weight="bold" className="mb-3">
            {t('write_answer')}
          </Text>
          <div className="mb-4 border-b border-primary/10" aria-hidden />
        </>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={disabled || submitting}
        rows={compact ? 3 : 4}
        placeholder={placeholder ?? t('answer_placeholder')}
        className={composeTextareaClass}
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
