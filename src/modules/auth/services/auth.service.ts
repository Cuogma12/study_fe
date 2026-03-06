import axiosClient from '../../../shared/utils/axiosClient';
import Cookies from 'js-cookie';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axiosClient.post('/auth/login', { email, password });
    
    // Lưu tokens vào cookies
    if (response.data && response.data.accessToken) {
      Cookies.set('access_token', response.data.accessToken, { expires: 1 }); // 1 day
      Cookies.set('refresh_token', response.data.refreshToken, { expires: 7 }); // 7 days
    }
    
    return response;
  },

  register: async (data: any) => {
    return axiosClient.post('/auth/register', data);
  },

  logout: async () => {
    const refreshToken = Cookies.get('refresh_token');
    if (refreshToken) {
      try {
        await axiosClient.post('/auth/logout', { refreshToken });
      } catch (e) {
        console.error("Logout API failed", e);
      }
    }
    
    // Xóa cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
  
  getMe: async (userId: string) => {
    return axiosClient.get(`/users/${userId}`);
  }
};