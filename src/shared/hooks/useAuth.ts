'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { decodeJWT } from '@/shared/utils/jwt';

interface AuthUser {
  userId: string;
  email: string | null;
  role: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      setUser(null);
      setReady(true);
      return;
    }

    const payload = decodeJWT(token);
    if (!payload?.userId) {
      setUser(null);
      setReady(true);
      return;
    }

    setUser({
      userId: payload.userId as string,
      email: (payload.email as string) ?? null,
      role: (payload.role as string) ?? null,
    });
    setReady(true);
  }, []);

  return {
    ready,
    isAuthenticated: Boolean(user),
    userId: user?.userId ?? null,
    user,
  };
};
