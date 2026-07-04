import { FieldErrorTone } from '@/shared/types/field-error';

/** Dùng ! để luôn thắng border mặc định (không cần focus mới thấy). */
export const FIELD_ERROR_STYLES: Record<FieldErrorTone, { field: string; text: string }> = {
  required: {
    field:
      '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/10 focus:!border-rose-500 focus:!ring-2 focus:!ring-rose-500',
    text: 'text-rose-500',
  },
  invalid: {
    field:
      '!border-amber-500 !bg-amber-50 dark:!bg-amber-900/10 focus:!border-amber-500 focus:!ring-2 focus:!ring-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
};
