export interface AnswerAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface AnswerItem {
  id: string;
  question_id: string;
  target_type: 'question' | 'answer';
  target_id: string;
  content: string;
  images?: string[];
  author: AnswerAuthor;
  is_accepted: boolean;
  created_at: string;
}

export interface AnswerListResponse {
  items: AnswerItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface CreateAnswerPayload {
  content: string;
  images?: string[];
}

export interface CreateReplyPayload {
  target_type: 'question' | 'answer';
  target_id: string;
  content: string;
  images?: string[];
}
