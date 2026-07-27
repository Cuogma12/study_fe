'use client';

import React from 'react';
import {
  Button,
  Label,
  Checkbox,
  Form,
  TextLink,
  Text,
  Input,
  Select,
} from '@/shared/components/atoms';
import {
  MailIcon,
  UserIcon,
  AlternateEmailIcon,
  SchoolIcon,
  LockIcon,
  LockResetIcon,
  GoogleIcon,
  GithubIcon,
} from '@/shared/components/atoms/icon';
import { PasswordInput } from '@/shared/components/molecules/PasswordInput';
import { useRegister } from '@/modules/auth/hooks/useRegister';

export const RegisterForm = () => {
  const {
    t,
    form,
    errors,
    submitError,
    loading,
    isFormComplete,
    gradeOptions,
    setField,
    handleBlur,
    handleSubmit,
    handleLoginRedirect,
  } = useRegister();

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Text variant="h1" className="!font-black tracking-[-0.033em]">
          {t('auth.register.title')}
        </Text>
        <Text variant="body1" className="text-slate-500 dark:text-slate-400">
          {t('auth.register.description')}
        </Text>
      </div>

      <Form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">{t('auth.register.full_name_label')}</Label>
          <Input
            value={form.full_name}
            onChange={(e) => setField('full_name', e.target.value)}
            onBlur={() => handleBlur('full_name')}
            placeholder={t('auth.register.full_name_placeholder')}
            icon={<UserIcon size={20} />}
            error={errors.full_name?.message}
            errorTone={errors.full_name?.tone}
            autoComplete="name"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.email_label')}</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder={t('auth.register.email_placeholder')}
              icon={<MailIcon size={20} />}
              error={errors.email?.message}
              errorTone={errors.email?.tone}
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.username_label')}</Label>
            <Input
              value={form.username}
              onChange={(e) => setField('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              placeholder={t('auth.register.username_placeholder')}
              icon={<AlternateEmailIcon size={20} />}
              error={errors.username?.message}
              errorTone={errors.username?.tone}
              autoComplete="username"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">{t('auth.register.grade_label')}</Label>
          <Select
            icon={<SchoolIcon size={20} />}
            options={gradeOptions}
            placeholder={t('auth.register.grade_placeholder')}
            value={form.grade_level}
            onChange={(e) => setField('grade_level', e.target.value)}
            onBlur={() => handleBlur('grade_level')}
            error={errors.grade_level?.message}
            errorTone={errors.grade_level?.tone}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.password_label')}</Label>
            <PasswordInput
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder={t('auth.register.password_placeholder')}
              icon={<LockIcon size={20} />}
              error={errors.password?.message}
              errorTone={errors.password?.tone}
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">
              {t('auth.register.confirm_password_label')}
            </Label>
            <PasswordInput
              value={form.confirm_password}
              onChange={(e) => setField('confirm_password', e.target.value)}
              onBlur={() => handleBlur('confirm_password')}
              placeholder={t('auth.register.confirm_password_placeholder')}
              icon={<LockResetIcon size={20} />}
              error={errors.confirm_password?.message}
              errorTone={errors.confirm_password?.tone}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 py-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              label=""
              className="mt-1"
              checked={form.terms}
              onChange={(e) => setField('terms', e.target.checked)}
            />
            <Label
              htmlFor="terms"
              className="!mb-0 !font-normal leading-tight text-slate-500 dark:text-slate-400"
            >
              {t('auth.register.terms_text')}{' '}
              <TextLink className="!text-sm">{t('auth.register.terms_link')}</TextLink>{' '}
              {t('auth.register.and')}{' '}
              <TextLink className="!text-sm">{t('auth.register.privacy_link')}</TextLink>.
            </Label>
          </div>
          {errors.terms && (
            <Text
              variant="small"
              className={
                errors.terms.tone === 'invalid'
                  ? '!text-amber-600 dark:!text-amber-400'
                  : '!text-rose-500'
              }
            >
              {errors.terms.message}
            </Text>
          )}
        </div>

        {submitError && (
          <Text
            variant="body2"
            className="rounded-lg bg-rose-50 px-3 py-2 !text-rose-600 dark:bg-rose-900/20"
          >
            {submitError}
          </Text>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || !isFormComplete}
          className="w-full !rounded-xl !py-4 shadow-lg shadow-primary/30"
        >
          {loading ? t('auth.register.signing_up') : t('auth.register.sign_up')}
        </Button>
      </Form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-sm">
          <Text
            variant="body2"
            className="bg-background-light px-4 !font-medium !text-slate-500 dark:bg-background-dark"
          >
            {t('auth.register.or_register_with')}
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="!gap-2 !border-slate-200 !py-3 dark:!border-slate-800"
        >
          <GoogleIcon size={20} />
          <Text
            as="span"
            variant="body2"
            weight="bold"
            className="!text-slate-700 dark:!text-slate-300"
          >
            {t('auth.register.google_login')}
          </Text>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!gap-2 !border-slate-200 !py-3 dark:!border-slate-800"
        >
          <GithubIcon size={20} />
          <Text
            as="span"
            variant="body2"
            weight="bold"
            className="!text-slate-700 dark:!text-slate-300"
          >
            {t('auth.register.github_login')}
          </Text>
        </Button>
      </div>

      <Text variant="body2" className="text-center text-slate-500 dark:text-slate-400">
        {t('auth.register.already_account')}{' '}
        <TextLink onClick={handleLoginRedirect}>{t('auth.register.login_link')}</TextLink>
      </Text>
    </div>
  );
};
