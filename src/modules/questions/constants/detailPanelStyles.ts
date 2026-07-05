/**
 * Giống QuestionAiSidebar: viền ngoài primary/20 + shadow-xl.
 */
export const detailPanel = {
  shell:
    'overflow-hidden rounded-xl border border-primary/20 bg-white shadow-xl dark:bg-slate-900',
  sectionDivider: 'border-primary/10',
  headerBar: 'border-b border-primary/10 px-5 py-4 sm:px-6',
  content: 'flex flex-col gap-5 px-5 py-5 sm:gap-6 sm:px-6 sm:py-6',
  footerDivider: 'border-t border-primary/10 pt-5',
  /** Vùng soạn — nền trắng, tách hẳn khỏi list */
  composeSection:
    'border-b border-primary/15 bg-white px-5 py-5 dark:bg-slate-900 sm:px-6 sm:py-6',
  composeArea:
    'rounded-xl border border-slate-300 bg-slate-50/50 p-4 dark:border-slate-600 dark:bg-slate-800/40',
  /** Danh sách comment — nền xám nhẹ, tách khỏi ô soạn */
  listSection: 'bg-slate-100/80 px-5 py-5 dark:bg-slate-800/40 sm:px-6 sm:py-6',
  answerBlock:
    'rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900',
  softBlock: 'rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60',
} as const;

/** Textarea / input soạn trả lời — viền thấy ngay cả khi chưa focus */
export const composeTextareaClass =
  'w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100';
