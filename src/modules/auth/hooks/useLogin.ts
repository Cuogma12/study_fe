import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import {
  buildRegisterPath,
  getSafeAuthRedirect,
} from '@/shared/utils/authRedirect';
import { authService } from '@/modules/auth/services/auth.service';

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const tApiErrors = useTranslations('api_errors');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectAfterAuth = getSafeAuthRedirect(searchParams.get('redirect')) ?? '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.data?.accessToken) {
        router.push(redirectAfterAuth);
      }
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push(buildRegisterPath(redirectAfterAuth === '/' ? null : redirectAfterAuth));
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleRegisterRedirect,
    t,
  };
};
