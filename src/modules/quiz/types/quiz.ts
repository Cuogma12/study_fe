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
  limit: number;
}

export interface GenerateQuizResponse {
  subject_id: string;
  topic_id: string | null;
  total_questions: number;
  questions: QuizQuestion[];
}

export interface SubmitQuizAnswerPayload {
  quiz_question_id: string;
  selected_answer: string;
}

export interface SubmitQuizPayload {
  subject_id: string;
  topic_id?: string;
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
