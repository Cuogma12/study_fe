export interface QuestionListAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface QuestionListSubject {
  id: string;
  name: string;
  slug: string;
}

export interface QuestionListTopic {
  id: string;
  name: string;
}

export interface QuestionListItem {
  id: string;
  title: string;
  excerpt: string;
  subject: QuestionListSubject;
  topic: QuestionListTopic | null;
  grade_level: number | null;
  author: QuestionListAuthor;
  views_count: number;
  answers_count: number;
  is_closed: boolean;
  is_saved: boolean;
  is_pinned: boolean;
  created_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface QuestionListResponse {
  items: QuestionListItem[];
  pagination: Pagination;
}

export interface QuestionListParams {
  page?: number;
  limit?: number;
  subject_id?: string;
  topic_id?: string;
  grade_level?: number;
  status?: 'open' | 'closed';
  is_closed?: boolean;
  q?: string;
  sort?: 'newest' | 'most_viewed' | 'most_answered';
}
