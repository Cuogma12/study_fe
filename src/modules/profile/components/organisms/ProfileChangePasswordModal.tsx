'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Form, Label, Text } from '@/shared/components/atoms';
import { ModalBackdrop } from '@/shared/components/molecules/ModalBackdrop';
import { PasswordInput } from '@/shared/components/molecules/PasswordInput';
import { FieldError } from '@/shared/types/field-error';
import { API_ERROR_CODES } from '@/shared/constants/apiErrorCodes';
import {
  extractApiErrorCode,
  resolveApiErrorMessage,
} from '@/shared/utils/resolveApiErrorMessage';
import { ChangePasswordPayload } from '../../services/profile.service';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

interface ProfileChangePasswordModalProps {
  open: boolean;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (payload: ChangePasswordPayload) => Promise<void>;
}

type FieldKey = 'old_password' | 'new_password' | 'confirm_password';

export const ProfileChangePasswordModal = ({
  open,
  saving,
  error,
  onClose,
  onSave,
}: ProfileChangePasswordModalProps) => {
  const t = useTranslations('profile');
  const tApiErrors = useTranslations('api_errors');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, FieldError>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setFieldErrors({});
    setFormError(null);
  }, [open]);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  if (!open) return null;

  const validate = (): boolean => {
    const next: Partial<Record<FieldKey, FieldError>> = {};

    if (!oldPassword) {
      next.old_password = { message: t('password.errors.required'), tone: 'required' };
    }
    if (!newPassword) {
      next.new_password = { message: t('password.errors.required'), tone: 'required' };
    } else if (!PASSWORD_REGEX.test(newPassword)) {
      next.new_password = { message: t('password.errors.invalid'), tone: 'invalid' };
    } else if (newPassword === oldPassword) {
      next.new_password = { message: t('password.errors.same_as_old'), tone: 'invalid' };
    }
    if (!confirmPassword) {
      next.confirm_password = { message: t('password.errors.required'), tone: 'required' };
    } else if (confirmPassword !== newPassword) {
      next.confirm_password = { message: t('password.errors.mismatch'), tone: 'invalid' };
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;

    try {
      await onSave({
        old_password: oldPassword,
        new_password: newPassword,
      });
    } catch (err: unknown) {
      const code = extractApiErrorCode(err);
      if (code === API_ERROR_CODES.USER.INVALID_OLD_PASSWORD) {
        setFieldErrors((current) => ({
          ...current,
          old_password: {
            message: resolveApiErrorMessage(
              err,
              tApiErrors,
              t('password.errors.wrong_old')
            ),
            tone: 'required',
          },
        }));
        setFormError(null);
        return;
      }

      setFormError(
        resolveApiErrorMessage(err, tApiErrors, t('password.failed'))
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <ModalBackdrop onClick={onClose} ariaLabel={t('password.cancel')} />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <Text variant="h5" weight="bold" className="mb-1">
          {t('password.title')}
        </Text>
        <Text variant="body2" className="mb-5 !text-slate-500">
          {t('password.desc')}
        </Text>

        <Form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label>{t('password.old')}</Label>
            <PasswordInput
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                if (fieldErrors.old_password) {
                  setFieldErrors((current) => {
                    const next = { ...current };
                    delete next.old_password;
                    return next;
                  });
                }
              }}
              error={fieldErrors.old_password?.message}
              errorTone={fieldErrors.old_password?.tone ?? 'required'}
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t('password.new')}</Label>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={fieldErrors.new_password?.message}
              errorTone={fieldErrors.new_password?.tone}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t('password.confirm')}</Label>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={fieldErrors.confirm_password?.message}
              errorTone={fieldErrors.confirm_password?.tone}
              autoComplete="new-password"
            />
          </div>

          {formError ? (
            <Text variant="body2" className="!text-rose-500">
              {formError}
            </Text>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
              {t('password.cancel')}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? t('password.saving') : t('password.save')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
