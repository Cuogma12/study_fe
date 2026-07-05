/**
 * Mã lỗi API — khớp `shared/messages/error-codes.js` (BE).
 * FE map sang `api_errors.<CODE>` trong messages/vi.json.
 */
export const API_ERROR_CODES = {
  SYSTEM: {
    VALIDATION_ERROR: 'STD_SYS_004',
  },
  VALIDATION: {
    CONTENT_REQUIRED: 'STD_VAL_001',
  },
  AUTH: {
    EMAIL_EXISTS: 'STD_AUT_011',
    USERNAME_EXISTS: 'STD_AUT_012',
    INVALID_CREDENTIALS: 'STD_AUT_013',
    USER_INACTIVE_OR_BANNED: 'STD_AUT_014',
  },
  QUESTION: {
    NOT_FOUND: 'STD_QTN_001',
    FORBIDDEN: 'STD_QTN_002',
    CLOSED: 'STD_QTN_003',
  },
  ANSWER: {
    NOT_FOUND: 'STD_ANS_001',
    FORBIDDEN: 'STD_ANS_002',
    TARGET_NOT_FOUND: 'STD_ANS_004',
  },
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES][keyof (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES]];

const API_ERROR_CODE_PATTERN = /^STD_[A-Z0-9_]+$/;

export const isApiErrorCode = (value: string): boolean => API_ERROR_CODE_PATTERN.test(value);
