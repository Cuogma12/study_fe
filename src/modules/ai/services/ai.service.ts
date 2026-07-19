import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import {
  AiConversation,
  AiConversationPage,
  CreateConversationPayload,
  SendMessagePayload,
  SendMessageResult,
} from '../types/ai';

export const aiService = {
  listConversations: async (page = 1, limit = 20): Promise<AiConversationPage> => {
    const res = await axiosClient.get(API_ENDPOINTS.AI.CONVERSATIONS, {
      params: { page, limit },
    });
    return res.data;
  },

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

  sendMessage: async (
    conversationId: string,
    payload: SendMessagePayload
  ): Promise<SendMessageResult> => {
    const res = await axiosClient.post(API_ENDPOINTS.AI.MESSAGES(conversationId), payload);
    return res.data;
  },
};
