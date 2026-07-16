/** Khớp BE `QUIZ_AI` — tổng số câu + gen theo batch rồi merge. */
export const QUIZ_AI = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 50,
  DEFAULT_LIMIT: 5,
  BATCH_SIZE: 5,
} as const;

export const clampQuizAiLimit = (limit: number) =>
  Math.min(Math.max(limit, QUIZ_AI.MIN_LIMIT), QUIZ_AI.MAX_LIMIT);
