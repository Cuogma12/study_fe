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
} as const;
