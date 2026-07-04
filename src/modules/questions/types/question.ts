import { AnswerItem } from './answer';

export interface QuestionAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface QuestionSubject {
  id: string;
  name: string;
  slug: string;
}

export interface QuestionTopic {
  id: string;
  name: string;
}

export interface QuestionDetail {
  id: string;
  title: string;
  content: string;
  images: string[];
  subject: QuestionSubject;
  topic: QuestionTopic | null;
  grade_level: number | null;
  author: QuestionAuthor;
  status: string;
  views_count: number;
  answers_count: number;
  is_closed: boolean;
  is_pinned: boolean;
  is_saved: boolean;
  answers: AnswerItem[];
  created_at: string;
  updated_at: string;
}
