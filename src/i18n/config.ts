/** Tạm chỉ dùng tiếng Việt — bỏ `en` khỏi locales khi chưa cần đa ngôn ngữ. */
export const locales = ['vi'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'vi';
