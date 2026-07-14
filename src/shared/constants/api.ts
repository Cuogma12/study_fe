/** Prefix API version — baseURL env kết thúc bằng `/api` */
export const API_V1 = '/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_V1}/auth/login`,
    REGISTER: `${API_V1}/auth/register`,
    LOGOUT: `${API_V1}/auth/logout`,
    REFRESH_TOKEN: `${API_V1}/auth/refresh-token`,
  },
  USERS: {
    GET_BY_ID: (userId: string) => `${API_V1}/users/${userId}`,
    UPDATE: (userId: string) => `${API_V1}/users/${userId}`,
  },
  ADMIN: {
    LOGIN_HISTORY: `${API_V1}/login-history`,
    USERS: `${API_V1}/users`,
    UPDATE_USER_STATUS: (userId: string) => `${API_V1}/users/${userId}/status`,
  },
  ME: {
    SAVED_QUESTIONS: `${API_V1}/me/saved-questions`,
  },
  SUBJECTS: {
    LIST: `${API_V1}/subjects`,
    TOPICS: (subjectId: string) => `${API_V1}/subjects/${subjectId}/topics`,
  },
  QUESTIONS: {
    LIST: `${API_V1}/questions`,
    CREATE: `${API_V1}/questions`,
    DETAIL: (id: string) => `${API_V1}/questions/${id}`,
    SAVE: (id: string) => `${API_V1}/questions/${id}/save`,
    CLOSE: (id: string) => `${API_V1}/questions/${id}/close`,
    ANSWERS: (id: string) => `${API_V1}/questions/${id}/answers`,
  },
  ANSWERS: {
    LIST: `${API_V1}/answers`,
    CREATE: `${API_V1}/answers`,
  },
  QUIZ: {
    BANK: `${API_V1}/quiz/bank`,
    SETS: `${API_V1}/quiz/sets`,
    SET_START: (setId: string) => `${API_V1}/quiz/sets/${setId}/start`,
    GENERATE: `${API_V1}/quiz/generate`,
    SUBMIT: `${API_V1}/quiz/submit`,
    ATTEMPT_RESULT: (attemptId: string) => `${API_V1}/quiz/attempts/${attemptId}/result`,
    ATTEMPT_PLAY: (attemptId: string) => `${API_V1}/quiz/attempts/${attemptId}/play`,
    ATTEMPT_ANSWERS: (attemptId: string) => `${API_V1}/quiz/attempts/${attemptId}/answers`,
    ATTEMPT_CHECK_ANSWER: (attemptId: string) =>
      `${API_V1}/quiz/attempts/${attemptId}/check-answer`,
    ATTEMPTS: `${API_V1}/quiz/attempts`,
  },
  AI: {
    CONVERSATIONS: `${API_V1}/ai/conversations`,
    CONVERSATION: (id: string) => `${API_V1}/ai/conversations/${id}`,
    MESSAGES: (id: string) => `${API_V1}/ai/conversations/${id}/messages`,
  },
} as const;
