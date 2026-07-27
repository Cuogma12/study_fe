'use client';

import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useAppNavigation } from './useAppNavigation';

export const useRequireAuth = () => {
  const { ready, isAuthenticated } = useAuth();
  const { navigateToLogin } = useAppNavigation();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      navigateToLogin();
    }
  }, [ready, isAuthenticated, navigateToLogin]);

  return { ready, isAuthenticated };
};
