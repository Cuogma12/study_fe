export type AiMode = 'tutor' | 'explain_quiz' | 'generate_quiz';

export type AiMessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  id: string;
  conversation_id: string;
  role: AiMessageRole;
  content: string;
  images: string[];
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

export interface AiConversationListItem {
  id: string;
  mode: AiMode;
  question_id: string | null;
  question_title: string | null;
  title: string | null;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface AiConversationPage {
  items: AiConversationListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface SendMessageResult {
  user_message: AiMessage;
  assistant_message: AiMessage;
}

export interface SendMessagePayload {
  content: string;
  images?: string[];
}

export interface CreateConversationPayload {
  mode: AiMode;
  question_id?: string | null;
}
