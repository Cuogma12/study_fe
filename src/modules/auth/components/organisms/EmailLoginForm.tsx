'use client';

import React from 'react';
import { Button, Label, Form, Text } from '@/shared/components/atoms';
import { LoginIcon } from '@/shared/components/atoms/icon';
import { FormField } from '@/shared/components/molecules/FormField';
import { PasswordInput } from '@/shared/components/molecules/PasswordInput';
import { useLogin } from '@/modules/auth/hooks/useLogin';

export const EmailLoginForm = () => {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit, t } = useLogin();

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600 dark:border-rose-800/50 dark:bg-rose-900/10">
          <Text variant="body2" weight="medium" className="!text-rose-600">
            {t('common.error')}:
          </Text>
          <Text variant="body2" className="!text-rose-600">
            {error}
          </Text>
        </div>
      )}
      <Form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="email"
          label={t('auth.login.email_label')}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={t('auth.login.email_placeholder')}
          className="py-3"
        />

        <div>
          <Label htmlFor="password" className="mb-1.5">
            {t('auth.login.password_label')}
          </Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('auth.login.password_placeholder')}
            className="py-3"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 py-3.5 shadow-lg shadow-primary/30"
          variant="primary"
          size="lg"
        >
          {loading ? t('auth.login.signing_in') : t('auth.login.sign_in')}
          {!loading && <LoginIcon size={20} />}
        </Button>
      </Form>
    </div>
  );
};
