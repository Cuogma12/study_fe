import { API_ENDPOINTS } from '@/shared/constants/api';
import axiosClient from '@/shared/utils/axiosClient';
import {
  CheckQuizAnswerPayload,
  CheckQuizAnswerResponse,
  GenerateQuizPayload,
  GenerateQuizResponse,
  QuizBankResponse,
  QuizAttemptMode,
  QuizAttemptPlayResponse,
  QuizAttemptResult,
  QuizAttemptListResponse,
  QuizMyAttemptsQuery,
  QuizSetListResponse,
  QuizSetType,
  StartQuizSetResponse,
  SubmitQuizPayload,
  SubmitQuizAnswerPayload,
  SubmitQuizResponse,
} from '../types/quiz';

export const quizService = {
  getQuizSets: async (params?: {
    page?: number;
    limit?: number;
    subject_id?: string;
    grade_level?: number;
    set_type?: QuizSetType;
    keyword?: string;
  }): Promise<QuizSetListResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUIZ.SETS, { params });
    return res.data;
  },

  startQuizSet: async (
    setId: string,
    mode: QuizAttemptMode = 'exam'
  ): Promise<StartQuizSetResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.SET_START(setId), { mode });
    return res.data;
  },

  getQuizBank: async (scope: 'all' | 'my' = 'all'): Promise<QuizBankResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUIZ.BANK, {
      params: { scope },
    });
    return res.data;
  },

  generateQuiz: async (payload: GenerateQuizPayload): Promise<GenerateQuizResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.GENERATE, payload);
    return res.data;
  },

  generateQuizAi: async (payload: GenerateQuizPayload): Promise<GenerateQuizResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.GENERATE_AI, payload);
    return res.data;
  },

  getAttemptPlay: async (attemptId: string): Promise<QuizAttemptPlayResponse> => {
    const res = await axiosClient.get(API_ENDPOINTS.QUIZ.ATTEMPT_PLAY(attemptId));
    return res.data;
  },

  saveAttemptAnswers: async (
    attemptId: string,
    answers: SubmitQuizAnswerPayload[]
  ): Promise<QuizAttemptPlayResponse> => {
    const res = await axiosClient.patch(API_ENDPOINTS.QUIZ.ATTEMPT_ANSWERS(attemptId), {
      answers,
    });
    return res.data;
  },

  checkAnswer: async (
    attemptId: string,
    payload: CheckQuizAnswerPayload
  ): Promise<CheckQuizAnswerResponse> => {
    const res = await axiosClient.post(API_ENDPOINTS.QUIZ.ATTEMPT_CHECK_ANSWER(attemptId), payload);
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

  getMyAttempts: async (
    pageOrQuery: number | QuizMyAttemptsQuery = 1,
    limit = 10,
    status?: QuizMyAttemptsQuery['status']
  ): Promise<QuizAttemptListResponse> => {
    const params: QuizMyAttemptsQuery =
      typeof pageOrQuery === 'object'
        ? pageOrQuery
        : { page: pageOrQuery, limit, status };
    const res = await axiosClient.get(API_ENDPOINTS.QUIZ.ATTEMPTS, { params });
    return res.data;
  },
};
