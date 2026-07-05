import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { authService } from '@/modules/auth/services/auth.service';
import { FieldError } from '@/shared/types/field-error';

export type RegisterField =
  | 'full_name'
  | 'email'
  | 'username'
  | 'grade_level'
  | 'password'
  | 'confirm_password'
  | 'terms';

type RegisterFormState = {
  full_name: string;
  email: string;
  username: string;
  grade_level: string;
  password: string;
  confirm_password: string;
  terms: boolean;
};

type RegisterErrors = Partial<Record<RegisterField, FieldError>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

const initialForm: RegisterFormState = {
  full_name: '',
  email: '',
  username: '',
  grade_level: '',
  password: '',
  confirm_password: '',
  terms: false,
};

const requiredError = (message: string): FieldError => ({ message, tone: 'required' });
const invalidError = (message: string): FieldError => ({ message, tone: 'invalid' });

export const useRegister = () => {
  const router = useRouter();
  const t = useTranslations();
  const tApiErrors = useTranslations('api_errors');

  const [form, setForm] = useState<RegisterFormState>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [touched, setTouched] = useState<Partial<Record<RegisterField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const gradeOptions = [
    { label: t('auth.register.grades.grade_10'), value: '10' },
    { label: t('auth.register.grades.grade_11'), value: '11' },
    { label: t('auth.register.grades.grade_12'), value: '12' },
  ];

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const validateField = (
    field: RegisterField,
    state: RegisterFormState
  ): FieldError | undefined => {
    switch (field) {
      case 'full_name':
        if (!state.full_name.trim()) {
          return requiredError(t('auth.register.errors.required'));
        }
        return undefined;

      case 'email':
        if (!state.email.trim()) {
          return requiredError(t('auth.register.errors.required'));
        }
        if (!EMAIL_REGEX.test(state.email.trim())) {
          return invalidError(t('auth.register.errors.email_invalid'));
        }
        return undefined;

      case 'username':
        if (!state.username.trim()) {
          return requiredError(t('auth.register.errors.required'));
        }
        if (state.username.trim().length < 3) {
          return invalidError(t('auth.register.errors.username_min'));
        }
        if (!USERNAME_REGEX.test(state.username.trim())) {
          return invalidError(t('auth.register.errors.username_format'));
        }
        return undefined;

      case 'grade_level':
        if (!state.grade_level) {
          return requiredError(t('auth.register.errors.required'));
        }
        return undefined;

      case 'password':
        if (!state.password) {
          return requiredError(t('auth.register.errors.required'));
        }
        if (!PASSWORD_REGEX.test(state.password)) {
          return invalidError(t('auth.register.errors.password_format'));
        }
        return undefined;

      case 'confirm_password':
        if (!state.confirm_password) {
          return requiredError(t('auth.register.errors.required'));
        }
        if (state.confirm_password !== state.password) {
          return invalidError(t('auth.register.errors.password_mismatch'));
        }
        return undefined;

      case 'terms':
        if (!state.terms) {
          return requiredError(t('auth.register.errors.terms_required'));
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (state: RegisterFormState): RegisterErrors => {
    const fields: RegisterField[] = [
      'full_name',
      'email',
      'username',
      'grade_level',
      'password',
      'confirm_password',
      'terms',
    ];
    const next: RegisterErrors = {};
    for (const field of fields) {
      const error = validateField(field, state);
      if (error) {
        next[field] = error;
      }
    }
    return next;
  };

  const shouldShowError = (field: RegisterField) => submitted || Boolean(touched[field]);

  const setField = <K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) => {
    const registerField = field as RegisterField;
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    setTouched((current) => ({ ...current, [registerField]: true }));
    setSubmitError(null);

    setErrors((current) => {
      const next = { ...current };
      const error = validateField(registerField, nextForm);
      if (error) {
        next[registerField] = error;
      } else {
        delete next[registerField];
      }

      // Đổi password thì cập nhật luôn lỗi confirm
      if (registerField === 'password' && (touched.confirm_password || submitted)) {
        const confirmError = validateField('confirm_password', nextForm);
        if (confirmError) {
          next.confirm_password = confirmError;
        } else {
          delete next.confirm_password;
        }
      }

      return next;
    });
  };

  const handleBlur = (field: RegisterField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => {
      const next = { ...current };
      const error = validateField(field, form);
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitted(true);

    const nextErrors = validateAll(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
        full_name: form.full_name.trim() || undefined,
      });
      router.push('/login');
    } catch (err: unknown) {
      setSubmitError(resolveApiErrorMessage(err, tApiErrors));
    } finally {
      setLoading(false);
    }
  };

  const visibleErrors: RegisterErrors = {};
  (Object.keys(errors) as RegisterField[]).forEach((field) => {
    if (shouldShowError(field) && errors[field]) {
      visibleErrors[field] = errors[field];
    }
  });

  return {
    t,
    form,
    errors: visibleErrors,
    submitError,
    loading,
    gradeOptions,
    setField,
    handleBlur,
    handleSubmit,
    handleLoginRedirect,
  };
};
