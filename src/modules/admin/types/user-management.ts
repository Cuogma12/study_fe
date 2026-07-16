export type AdminUserRole = 'user' | 'admin';
export type AdminUserStatus = 'active' | 'inactive' | 'banned' | 'pending';

export interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: AdminUserRole;
  grade_level: number | null;
  status: AdminUserStatus;
  created_at: string;
}

export interface AdminUpdateUserProfilePayload {
  username?: string;
  email?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  grade_level?: number | null;
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
