export interface AdminLoginHistoryItem {
  id: string;
  user_id: string | null;
  email: string | null;
  username: string | null;
  ip_address: string | null;
  user_agent: string | null;
  device_info: string | null;
  login_successful: boolean;
  failure_reason: string | null;
  created_at: string;
}

export interface AdminLoginHistoryPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface AdminLoginHistoryListResponse {
  items: AdminLoginHistoryItem[];
  pagination: AdminLoginHistoryPagination;
}

export interface AdminLoginHistoryQuery {
  page?: number;
  limit?: number;
  search?: string;
  login_successful?: boolean;
}
