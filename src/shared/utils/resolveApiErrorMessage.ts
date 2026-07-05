import { isApiErrorCode } from '@/shared/constants/apiErrorCodes';

type ApiErrorTranslator = (key: string) => string;

type ApiErrorPayload = {
  message?: string;
};

/**
 * Lấy mã lỗi đầu tiên từ response BE (`message` field).
 * BE có thể trả một mã hoặc nhiều mã nối bằng dấu phẩy.
 */
export const extractApiErrorCode = (error: unknown): string | null => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const message = (error as { response?: { data?: ApiErrorPayload } }).response?.data?.message;
  if (!message || typeof message !== 'string') {
    return null;
  }

  const firstToken = message.split(',')[0]?.trim();
  if (!firstToken || !isApiErrorCode(firstToken)) {
    return null;
  }

  return firstToken;
};

/**
 * Map mã lỗi BE → message hiển thị qua namespace `api_errors` (next-intl).
 */
export const resolveApiErrorMessage = (
  codeOrError: string | unknown,
  t: ApiErrorTranslator,
  fallbackMessage?: string
): string => {
  const code =
    typeof codeOrError === 'string' && isApiErrorCode(codeOrError)
      ? codeOrError
      : extractApiErrorCode(codeOrError);

  if (!code) {
    return fallbackMessage ?? t('fallback');
  }

  const translated = t(code);
  if (translated === code) {
    return fallbackMessage ?? t('STD_SYS_004');
  }

  return translated;
};
