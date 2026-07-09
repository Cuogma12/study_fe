export type QuizAttemptStatus = 'in_progress' | 'submitted';

export interface QuizQuestion {
  id: string;
  subject_id: string;
  topic_id: string | null;
  question_text: string;
  options: Record<string, string>;
  difficulty_level: string | null;
  source_type: string | null;
}

export interface GenerateQuizPayload {
  subject_id: string;
  topic_id?: string;
  grade_level?: number;
  limit: number;
}

export interface GenerateQuizResponse {
  attempt_id: string;
  subject_id: string;
  topic_id: string | null;
  grade_level: number | null;
  status: QuizAttemptStatus;
  total_questions: number;
  questions: QuizQuestion[];
}

export interface QuizAttemptPlayResponse {
  attempt_id: string;
  subject_id: string;
  topic_id: string | null;
  grade_level: number | null;
  status: QuizAttemptStatus;
  total_questions: number;
  answered_count: number;
  questions: QuizQuestion[];
  saved_answers: SubmitQuizAnswerPayload[];
}

export interface SubmitQuizAnswerPayload {
  quiz_question_id: string;
  selected_answer: string;
}

export interface SubmitQuizPayload {
  attempt_id: string;
  answers: SubmitQuizAnswerPayload[];
}

export interface SubmitQuizResponse {
  attempt_id: string;
  subject_id: string;
  topic_id: string | null;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  score: number;
  submitted_at: string;
}

export interface QuizAttemptAnswer {
  quiz_question_id: string;
  question_text: string;
  options: Record<string, string>;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string | null;
}

export interface QuizAttemptResult {
  attempt_id: string;
  subject_id: string;
  topic_id: string | null;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  score: number;
  submitted_at: string;
  answers: QuizAttemptAnswer[];
}

export interface QuizBankItem {
  subject_id: string;
  topic_id: string;
  subject_name: string;
  topic_name: string;
  grade_levels: number[];
  question_count: number;
  mine_question_count: number;
  is_mine: boolean;
}

export interface QuizBankResponse {
  items: QuizBankItem[];
}

export interface QuizAttemptListItem {
  attempt_id: string;
  subject_id: string;
  topic_id: string | null;
  subject_name: string;
  topic_name: string;
  grade_level: number | null;
  status: QuizAttemptStatus;
  total_questions: number;
  answered_count: number;
  correct_count: number | null;
  wrong_count: number | null;
  score: number | null;
  created_at: string | null;
  updated_at: string | null;
  submitted_at: string | null;
}

export interface QuizAttemptListResponse {
  items: QuizAttemptListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
