import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { authService } from '@/modules/auth/services/auth.service';

export const useLogin = () => {
  const router = useRouter();
  const t = useTranslations();
  const tApiErrors = useTranslations('api_errors');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.data?.accessToken) {
        router.push('/');
      }
    } catch (err: unknown) {
      setError(resolveApiErrorMessage(err, tApiErrors));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleForgotPassword,
    handleRegisterRedirect,
    t,
  };
};
