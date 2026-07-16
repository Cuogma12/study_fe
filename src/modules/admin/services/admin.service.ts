import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import { AdminLoginHistoryListResponse, AdminLoginHistoryQuery } from '../types/login-history';
import {
  AdminUserItem,
  AdminUpdateUserProfilePayload,
  AdminUsersListResponse,
  AdminUsersQuery,
  AdminUserRole,
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

  updateUserRole: async (
    userId: string,
    role: AdminUserRole
  ): Promise<AdminUserItem> => {
    const res = await axiosClient.patch(API_ENDPOINTS.ADMIN.UPDATE_USER_ROLE(userId), {
      role,
    });
    return res.data;
  },

  updateUserProfile: async (
    userId: string,
    payload: AdminUpdateUserProfilePayload
  ): Promise<AdminUserItem> => {
    const res = await axiosClient.put(API_ENDPOINTS.USERS.UPDATE(userId), payload);
    return res.data;
  },

  resetUserPassword: async (userId: string, newPassword: string): Promise<void> => {
    await axiosClient.patch(API_ENDPOINTS.USERS.CHANGE_PASSWORD(userId), {
      new_password: newPassword,
    });
  },
};
