/** Panel styles cho quiz dashboard — tách vùng bằng viền + shadow nhẹ. */
export const quizDashboardPanel = {
  shell:
    'rounded-xl border border-gray-300 bg-white p-4 shadow-md sm:p-5 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/25',
  shellHover:
    'transition-shadow duration-200 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-black/40',
  filters:
    'rounded-xl border border-gray-300 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900',
  sectionTitle: '!font-semibold !text-slate-900 dark:!text-white',
  /** Select / Input compact trên form tạo quiz */
  fieldControl:
    '!border-gray-300 !py-2.5 !text-sm dark:!border-slate-600',
  selectControl: '!border-gray-300 !py-2.5 !pr-10 !text-sm dark:!border-slate-600',
} as const;
