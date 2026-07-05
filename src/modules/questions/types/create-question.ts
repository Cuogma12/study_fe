export interface CreateQuestionPayload {
  title: string;
  content: string;
  subject_id: string;
  topic_id?: string;
  grade_level: number;
  images?: string[];
}

export type UpdateQuestionPayload = CreateQuestionPayload;

export interface CreateQuestionResponse {
  id: string;
  user_id: string;
  title: string;
  content: string;
  subject_id: string;
  topic_id: string | null;
  grade_level: number | null;
  images: string[];
  status: string;
  views_count: number;
  answers_count: number;
  created_at: string;
  updated_at: string;
}
