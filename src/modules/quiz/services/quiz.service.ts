import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import {
  GenerateQuizPayload,
  GenerateQuizResponse,
  QuizAttemptResult,
  SubmitQuizPayload,
  SubmitQuizResponse,
} from '../types/quiz';

export const quizService = {
  generateQuiz: async (payload: GenerateQuizPayload): Promise<GenerateQuizResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.GENERATE, payload);
    return res.data;
  },

  submitQuiz: async (payload: SubmitQuizPayload): Promise<SubmitQuizResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.SUBMIT, payload);
    return res.data;
  },

  getAttemptResult: async (attemptId: string): Promise<QuizAttemptResult> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUIZ.ATTEMPT_RESULT(attemptId));
    return res.data;
  },
};
