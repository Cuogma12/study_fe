export type AiMode = 'tutor' | 'explain_quiz' | 'generate_quiz';

export type AiMessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  id: string;
  conversation_id: string;
  role: AiMessageRole;
  content: string;
  model_used?: string | null;
  tokens_used?: number | null;
  created_at: string;
}

export interface AiConversation {
  id: string;
  user_id: string;
  mode: AiMode;
  question_id: string | null;
  title: string | null;
  created_at: string;
  updated_at: string;
  messages: AiMessage[];
}

export interface SendMessageResult {
  user_message: AiMessage;
  assistant_message: AiMessage;
}

export interface CreateConversationPayload {
  mode: AiMode;
  question_id?: string | null;
}
