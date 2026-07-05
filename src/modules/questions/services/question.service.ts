import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';
import { CreateQuestionPayload, CreateQuestionResponse, UpdateQuestionPayload } from '../types/create-question';
import { QuestionDetail } from '../types/question';

export const questionService = {
  create: async (payload: CreateQuestionPayload): Promise<CreateQuestionResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUESTIONS.CREATE, payload);
    return res.data;
  },

  getById: async (id: string): Promise<QuestionDetail> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUESTIONS.DETAIL(id));
    return res.data;
  },

  toggleSave: async (id: string): Promise<{ saved: boolean }> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUESTIONS.SAVE(id));
    return res.data;
  },

  close: async (id: string): Promise<{ id: string; status: string; updated_at: string }> => {
    const res = await axiosClient.patch(API_ENDPOINTS.QUESTIONS.CLOSE(id));
    return res.data;
  },

  update: async (
    id: string,
    payload: UpdateQuestionPayload
  ): Promise<QuestionDetail> => {
    const res = await axiosClient.put(API_ENDPOINTS.QUESTIONS.DETAIL(id), payload);
    return res.data;
  },

  delete: async (id: string): Promise<{ id: string; deleted: boolean }> => {
    const res = await axiosClient.delete(API_ENDPOINTS.QUESTIONS.DETAIL(id));
    return res.data;
  },
};
