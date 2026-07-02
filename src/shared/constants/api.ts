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
  },
  SUBJECTS: {
    LIST: `${API_V1}/subjects`,
  },
  QUESTIONS: {
    LIST: `${API_V1}/questions`,
    CREATE: `${API_V1}/questions`,
    DETAIL: (id: string) => `${API_V1}/questions/${id}`,
  },
} as const;
