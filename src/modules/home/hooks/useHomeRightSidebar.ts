'use client';

import { useTranslations } from 'next-intl';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAuth } from '@/shared/hooks/useAuth';

export const useHomeRightSidebar = () => {
  const t = useTranslations('home.right_sidebar');
  const { navigateTo } = useAppNavigation();
  const { isAuthenticated } = useAuth();

  const requireAuthThen = (path: string) => {
    if (!isAuthenticated) {
      navigateTo('/login');
      return;
    }
    navigateTo(path);
  };

  const openAiHub = () => requireAuthThen('/ai');
  const openTutor = () => requireAuthThen('/ai?mode=tutor');

  return {
    t,
    openAiHub,
    openTutor,
  };
};
