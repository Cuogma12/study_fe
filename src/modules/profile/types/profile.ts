export interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string;
  grade_level: number | null;
  status: string;
  created_at: string;
}
