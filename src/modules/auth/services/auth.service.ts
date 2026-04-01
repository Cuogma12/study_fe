import axiosClient from '@/shared/utils/axiosClient';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '@/shared/constants/api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    
    // Save tokens to cookies
    if (response.data && response.data.accessToken) {
      Cookies.set('access_token', response.data.accessToken, { expires: 1 }); // 1 day
      Cookies.set('refresh_token', response.data.refreshToken, { expires: 7 }); // 7 days
    }
    
    return response;
  },

  register: async (data: any) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async () => {
    const refreshToken = Cookies.get('refresh_token');
    if (refreshToken) {
      try {
        await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      } catch (e) {
        console.error("Logout API failed", e);
      }
    }
    
    // Clear cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
  
  getMe: async (userId: string) => {
    return axiosClient.get(API_ENDPOINTS.USERS.GET_BY_ID(userId));
  }
};