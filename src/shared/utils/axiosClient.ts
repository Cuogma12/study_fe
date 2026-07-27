import axios from 'axios';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '@/shared/constants/api';
import { buildLoginPath, getCurrentReturnPath } from '@/shared/utils/authRedirect';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const redirectToLogin = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.location.href = buildLoginPath(getCurrentReturnPath());
};

// Request Interceptor (Attach Token)
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Handle Refresh Token)
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.message;

    if (error.response?.status === 401 && errorCode === 'STD_AUT_020') {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      redirectToLogin();
      return Promise.reject(error);
    }

    // If 401 (Unauthorized) and error code is STD_AUT_021 (Token expired/invalid)
    if (
      error.response?.status === 401 &&
      errorCode === 'STD_AUT_021' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token API
        const res = await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          refreshToken: refreshToken,
        });

        const newAccessToken = res.data.data.accessToken;

        // Store new token
        Cookies.set('access_token', newAccessToken);

        // Attach new token to the failed request and retry
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // If refresh token also fails, redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
