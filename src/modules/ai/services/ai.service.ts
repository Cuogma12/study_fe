import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import {
  AiConversation,
  CreateConversationPayload,
  SendMessageResult,
} from '../types/ai';

export const aiService = {
  createOrResumeConversation: async (
    payload: CreateConversationPayload
  ): Promise<AiConversation> => {
    const res = await axiosClient.post(API_ENDPOINTS.AI.CONVERSATIONS, payload);
    return res.data;
  },

  getConversation: async (id: string): Promise<AiConversation> => {
    const res = await axiosClient.get(API_ENDPOINTS.AI.CONVERSATION(id));
    return res.data;
  },

  sendMessage: async (conversationId: string, content: string): Promise<SendMessageResult> => {
    const res = await axiosClient.post(API_ENDPOINTS.AI.MESSAGES(conversationId), {
      content,
    });
    return res.data;
  },
};
