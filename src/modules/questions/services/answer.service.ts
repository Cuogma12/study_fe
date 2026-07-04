import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';
import {
  AnswerItem,
  AnswerListResponse,
  CreateAnswerPayload,
  CreateReplyPayload,
} from '../types/answer';

export const answerService = {
  createForQuestion: async (
    questionId: string,
    payload: CreateAnswerPayload
  ): Promise<AnswerItem> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUESTIONS.ANSWERS(questionId), payload);
    return res.data;
  },

  createReply: async (payload: CreateReplyPayload): Promise<AnswerItem> => {
    const res = await axiosClient.post(API_ENDPOINTS.ANSWERS.CREATE, payload);
    return res.data;
  },

  listByTarget: async (
    targetType: 'question' | 'answer',
    targetId: string
  ): Promise<AnswerListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.ANSWERS.LIST, {
      params: { target_type: targetType, target_id: targetId, page: 1, limit: 50 },
    });
    return res.data;
  },
};
