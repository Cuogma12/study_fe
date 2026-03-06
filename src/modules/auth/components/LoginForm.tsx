'use client';

import React, { useState } from 'react';
import { authService } from '../../services/auth.service';

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
        // Normally you'd redirect here: router.push('/')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login to Study App</h2>
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          Error Code: {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            required
            placeholder="admin@example.com"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            required
            placeholder="••••••••"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      {token && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm font-semibold text-green-800 mb-2">✅ Login Successful!</p>
          <p className="text-xs text-gray-600 mb-1">Your Access Token (copied to cookies):</p>
          <div className="relative">
            <textarea
              readOnly
              className="w-full p-2 text-xs font-mono bg-white border border-gray-200 rounded text-gray-800 h-24"
              value={token}
            />
          </div>
        </div>
      )}
    </div>
  );
}