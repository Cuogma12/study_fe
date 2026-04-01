'use client';

import React from 'react';
import { Button, Label, Checkbox, Form, TextLink, Text } from '@/shared/components/atoms';
import { LoginIcon, CheckIcon } from '@/shared/components/atoms/icon';
import { FormField } from '@/shared/components/molecules/FormField';
import { PasswordInput } from '@/shared/components/molecules/PasswordInput';
import { useLogin } from '@/modules/auth/hooks/useLogin';

export const EmailLoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    token,
    handleSubmit,
    handleForgotPassword,
    t,
  } = useLogin();

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-100 dark:border-rose-800/50 flex items-center gap-2">
          <span className="font-medium">Error:</span> {error}
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
    <div className="flex justify-between items-center mb-1.5">
      <Label htmlFor="password">{t('auth.login.password_label')}</Label>
      <TextLink onClick={handleForgotPassword} className="text-sm font-medium">
        {t('auth.login.forgot_password')}
      </TextLink>
    </div>
    <PasswordInput
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      placeholder={t('auth.login.password_placeholder')}
      className="py-3"
    />
  </div>

  <Checkbox 
    id="remember-me"
    label={t('auth.login.remember_me')}
  />

  <Button
    type="submit"
    disabled={loading}
    className="w-full py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
    variant="primary"
    size="lg"
  >
    {loading ? t('auth.login.signing_in') : t('auth.login.sign_in')}
    {!loading && <LoginIcon size={20} />}
  </Button>
</Form>

{/* Temporary token display for testing purposes */}
{token && (
  <div className="mt-8 space-y-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-800/50 dark:bg-emerald-900/10">
    <div className="flex items-center gap-2">
      <CheckIcon size={18} className="text-emerald-600 dark:text-emerald-400" />
      <Text variant="body2" weight="bold" className="!text-emerald-800 dark:!text-emerald-400">
        {t('auth.login.success_message')}
      </Text>
    </div>
          <textarea
            readOnly
            className="h-20 w-full outline-none rounded-lg border border-emerald-200 bg-white p-3 font-mono text-[10px] text-slate-600 dark:border-emerald-800 dark:bg-slate-800 dark:text-slate-400"
            value={token}
          />
        </div>
      )}
    </div>
  );
};
