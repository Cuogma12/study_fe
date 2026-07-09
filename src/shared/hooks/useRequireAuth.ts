'use client';

import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useAppNavigation } from './useAppNavigation';

export const useRequireAuth = () => {
  const { ready, isAuthenticated } = useAuth();
  const { navigateTo } = useAppNavigation();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      navigateTo('/login');
    }
  }, [ready, isAuthenticated, navigateTo]);

  return { ready, isAuthenticated };
};
