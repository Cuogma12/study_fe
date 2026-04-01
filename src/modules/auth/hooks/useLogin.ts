import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authService } from '@/modules/auth/services/auth.service';

export const useLogin = () => {
  const router = useRouter();
  const t = useTranslations();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setToken('');

    try {
      const res = await authService.login(email, password);
      if (res.data?.accessToken) {
        setToken(res.data.accessToken);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
    token,
    handleSubmit,
    handleForgotPassword,
    handleRegisterRedirect,
    t,
  };
};
