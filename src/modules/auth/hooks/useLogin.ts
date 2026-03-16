'use client';

import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/dist/client/components/navigation';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

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

  const handleCreateAccount = () => {
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
    handleCreateAccount,
  };
};
