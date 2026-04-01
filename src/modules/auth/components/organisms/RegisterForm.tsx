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
  Select 
} from '@/shared/components/atoms';
import { 
  MailIcon, 
  UserIcon, 
  AlternateEmailIcon, 
  SchoolIcon, 
  LockIcon, 
  LockResetIcon, 
  GoogleIcon, 
  GithubIcon 
} from '@/shared/components/atoms/icon';
import { PasswordInput } from '@/shared/components/molecules/PasswordInput';
import { useRegister } from '@/modules/auth/hooks/useRegister';

export const RegisterForm = () => {
  const { t, handleLoginRedirect, gradeOptions } = useRegister();

  return (
    <div className="flex flex-col max-w-[520px] w-full gap-8 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <Text variant="h1" className="!font-black tracking-[-0.033em]">
          {t('auth.register.title')}
        </Text>
        <Text variant="body1" className="text-slate-500 dark:text-slate-400">
          {t('auth.register.description')}
        </Text>
      </div>

      {/* Registration Form */}
      <Form className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">{t('auth.register.full_name_label')}</Label>
          <Input 
            placeholder={t('auth.register.full_name_placeholder')}
            icon={<UserIcon size={20} />}
          />
        </div>

        {/* Email & Username Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.email_label')}</Label>
            <Input 
              type="email"
              placeholder={t('auth.register.email_placeholder')}
              icon={<MailIcon size={20} />}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.username_label')}</Label>
            <Input 
              placeholder={t('auth.register.username_placeholder')}
              icon={<AlternateEmailIcon size={20} />}
            />
          </div>
        </div>

        {/* Grade Level Dropdown */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">{t('auth.register.grade_label')}</Label>
          <Select 
            icon={<SchoolIcon size={20} />}
            options={gradeOptions}
            placeholder={t('auth.register.grade_placeholder')}
            defaultValue=""
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.password_label')}</Label>
            <PasswordInput 
              placeholder={t('auth.register.password_placeholder')}
              icon={<LockIcon size={20} />}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('auth.register.confirm_password_label')}</Label>
            <PasswordInput 
              placeholder={t('auth.register.confirm_password_placeholder')}
              icon={<LockResetIcon size={20} />}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3 py-2">
          <Checkbox 
            id="terms"
            label=""
            className="mt-1"
          />
          <Label htmlFor="terms" className="!mb-0 !font-normal text-slate-500 dark:text-slate-400 leading-tight">
            {t('auth.register.terms_text')}{' '}
            <TextLink className="!text-sm">{t('auth.register.terms_link')}</TextLink>{' '}
            {t('auth.register.and')}{' '}
            <TextLink className="!text-sm">{t('auth.register.privacy_link')}</TextLink>.
          </Label>
        </div>

        {/* Sign Up Button */}
        <Button 
          variant="primary" 
          size="lg"
          className="w-full !rounded-xl !py-4 shadow-lg shadow-primary/30"
        >
          {t('auth.register.sign_up')}
        </Button>
      </Form>

      {/* Social Sign Up Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background-light dark:bg-background-dark px-4 text-slate-500 font-medium">
            {t('auth.register.or_register_with')}
          </span>
        </div>
      </div>

      {/* Social Icons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <GoogleIcon size={20} />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.register.google_login')}</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <GithubIcon size={20} />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.register.github_login')}</span>
        </button>
      </div>

      {/* Footer Text */}
      <Text variant="body2" className="text-center text-slate-500 dark:text-slate-400">
        {t('auth.register.already_account')}{' '}
        <TextLink onClick={handleLoginRedirect}>{t('auth.register.login_link')}</TextLink>
      </Text>
    </div>
  );
};
