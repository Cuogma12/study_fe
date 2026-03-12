'use client';

import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Button, LogoIcon } from '@/shared/components/atoms';
import { FormField } from '@/shared/components/molecules/FormField';

export default function LoginForm() {
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

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-xl text-primary">
          <LogoIcon size={32} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your StudyApp account</p>
        </div>
      </div>
      
      {error && (
        <div className="p-4 text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-100 dark:border-rose-800/50 flex items-center gap-2">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="name@example.com"
        />
        
        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant="primary"
          size="lg"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {token && (
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl">
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2">✅ Login Successful!</p>
          <textarea
            readOnly
            className="w-full p-3 text-[10px] font-mono bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 rounded-lg text-slate-600 dark:text-slate-400 h-20 outline-none"
            value={token}
          />
        </div>
      )}
    </div>
  );
}