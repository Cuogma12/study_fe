import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';
import { UserProfile } from '../types/profile';
import {
  QuestionListItem,
  QuestionListResponse,
} from '@/modules/home/types/question';

export interface SavedQuestionItem {
  saved_at: string;
  question: QuestionListItem;
}

export interface SavedQuestionsResponse {
  items: SavedQuestionItem[];
  pagination: QuestionListResponse['pagination'];
}

export interface UpdateProfilePayload {
  full_name?: string;
  bio?: string | null;
  grade_level?: number | null;
  avatar_url?: string | null;
}

export const profileService = {
  getById: async (userId: string): Promise<UserProfile> => {
    const res = await axiosClient.get(API_ENDPOINTS.USERS.GET_BY_ID(userId));
    return res.data;
  },

  update: async (userId: string, payload: UpdateProfilePayload): Promise<UserProfile> => {
    const res = await axiosClient.put(API_ENDPOINTS.USERS.UPDATE(userId), payload);
    return res.data;
  },

  getMyQuestions: async (userId: string): Promise<QuestionListItem[]> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUESTIONS.LIST, {
      params: { user_id: userId, page: 1, limit: 20, sort: 'newest' },
    });
    return res.data.items;
  },

  getSavedQuestions: async (): Promise<SavedQuestionItem[]> => {
    const res = await axiosClient.get(API_ENDPOINTS.ME.SAVED_QUESTIONS, {
      params: { page: 1, limit: 20 },
    });
    return res.data.items;
  },
};
