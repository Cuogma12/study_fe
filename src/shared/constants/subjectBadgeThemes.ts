/**
 * Màu badge môn học theo slug — config UI, không lấy từ API/DB.
 * Slug khớp seed BE: scripts/seed-subjects.js
 */
export const SUBJECT_BADGE_THEMES: Record<string, string> = {
  toan: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'vat-ly': 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  'hoa-hoc': 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  'tieng-anh': 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  'ngu-van': 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  'sinh-hoc': 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  'dia-ly': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'tin-hoc': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  gdcd: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  'lich-su': 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
};

export const DEFAULT_SUBJECT_BADGE_CLASS =
  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

const BADGE_BASE_CLASS = 'rounded-md px-2.5 py-1 text-xs font-bold uppercase';

export const getSubjectBadgeClass = (slug?: string | null): string => {
  const theme = slug ? SUBJECT_BADGE_THEMES[slug] : undefined;
  return `${BADGE_BASE_CLASS} ${theme ?? DEFAULT_SUBJECT_BADGE_CLASS}`;
};

export const NEUTRAL_BADGE_CLASS = `${BADGE_BASE_CLASS} ${DEFAULT_SUBJECT_BADGE_CLASS}`;
