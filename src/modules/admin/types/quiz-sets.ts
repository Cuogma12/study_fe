export interface AdminQuizSetItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  set_type: string;
  subject_id: string;
  subject_name: string;
  topic_id: string | null;
  topic_name: string;
  grade_level: number | null;
  duration_minutes: number | null;
  display_order: number | null;
  is_published: boolean | null;
  question_count: number;
  attempt_count: number;
  created_at: string;
  updated_at: string;
}

export interface AdminQuizSetsPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface AdminQuizSetsListResponse {
  items: AdminQuizSetItem[];
  pagination: AdminQuizSetsPagination;
}

export interface AdminQuizSetsQuery {
  page?: number;
  limit?: number;
  subject_id?: string;
  grade_level?: number;
  keyword?: string;
  is_published?: boolean;
}

export interface AdminUpdateQuizSetPayload {
  title?: string;
  description?: string | null;
  duration_minutes?: number | null;
  display_order?: number;
  is_published?: boolean;
}

export interface AdminEditQuizSetFormValues {
  title: string;
  description: string;
  duration_minutes: string;
  display_order: string;
  is_published: 'true' | 'false';
}
