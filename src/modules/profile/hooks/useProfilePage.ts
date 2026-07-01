import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { authService } from '@/modules/auth/services/auth.service';
import { decodeJWT } from '@/shared/utils/jwt';

export const useProfilePage = () => {
  const t = useTranslations();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          setLoading(false);
          return;
        }

        const payload = decodeJWT(token);
        const userId = payload?.userId;

        if (userId) {
          const res = await authService.getMe(userId);
          // axiosClient already returns response.data, so res is { success, data }
          setProfile(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    t,
    profile,
    loading,
  };
};