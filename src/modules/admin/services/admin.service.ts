import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import { AdminLoginHistoryListResponse, AdminLoginHistoryQuery } from '../types/login-history';

export const adminService = {
  getLoginHistory: async (
    query: AdminLoginHistoryQuery
  ): Promise<AdminLoginHistoryListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.ADMIN.LOGIN_HISTORY, {
      params: query,
    });
    return res.data;
  },
};
