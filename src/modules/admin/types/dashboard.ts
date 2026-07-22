export interface AdminTopLearnerItem {
  user_id: string;
  username: string | null;
  email: string | null;
  full_name: string | null;
  attempt_count: number;
  average_score: number | null;
}

export interface AdminDashboardData {
  total_users: number;
  total_quiz_sets: number;
  total_attempts: number;
  average_score: number | null;
  total_questions: number;
  total_ai_conversations: number;
  top_learners: AdminTopLearnerItem[];
}
