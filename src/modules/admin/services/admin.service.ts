import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import { AdminLoginHistoryListResponse, AdminLoginHistoryQuery } from '../types/login-history';
import {
  AdminUserItem,
  AdminUsersListResponse,
  AdminUsersQuery,
  AdminUserStatus,
} from '../types/user-management';

export const adminService = {
  getLoginHistory: async (
    query: AdminLoginHistoryQuery
  ): Promise<AdminLoginHistoryListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.ADMIN.LOGIN_HISTORY, {
      params: query,
    });
    return res.data;
  },

  getUsers: async (query: AdminUsersQuery): Promise<AdminUsersListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.ADMIN.USERS, {
      params: query,
    });
    return res.data;
  },

  updateUserStatus: async (
    userId: string,
    status: AdminUserStatus
  ): Promise<AdminUserItem> => {
    const res = await axiosClient.patch(API_ENDPOINTS.ADMIN.UPDATE_USER_STATUS(userId), {
      status,
    });
    return res.data;
  },
};
