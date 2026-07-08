export type AdminUserRole = 'user' | 'admin' | 'moderator';
export type AdminUserStatus = 'active' | 'inactive' | 'banned' | 'pending';

export interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: AdminUserRole;
  status: AdminUserStatus;
  created_at: string;
}

export interface AdminUsersPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface AdminUsersListResponse {
  items: AdminUserItem[];
  pagination: AdminUsersPagination;
}

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: AdminUserRole;
  status?: AdminUserStatus;
}
