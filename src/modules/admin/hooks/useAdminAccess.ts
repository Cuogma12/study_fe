'use client';

import { useAuth } from '@/shared/hooks/useAuth';

export const useAdminAccess = () => {
  const { ready, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return {
    ready,
    user,
    isAdmin,
  };
};
