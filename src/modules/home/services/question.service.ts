import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';
import { QuestionListParams, QuestionListResponse } from '../types/question';

export const questionService = {
  getQuestions: async (params?: QuestionListParams): Promise<QuestionListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUESTIONS.LIST, { params });
    return res.data;
  },
};
