/** Styles cho màn làm bài quiz — layout tập trung, một câu / lượt. */
export const quizPlayLayout = {
  page: 'flex min-h-0 flex-1 flex-col bg-[#fcf8ff] text-slate-900 dark:bg-slate-950 dark:text-slate-100',
  main: 'flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-28 pt-20 md:px-6',
  body: 'mx-auto flex w-full max-w-[1120px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-8',
  content: 'flex min-w-0 flex-1 flex-col gap-8',
  questionCard:
    'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6',
  optionButton:
    'flex w-full cursor-pointer items-center gap-4 rounded-xl border-2 p-4 text-left text-slate-800 outline-none transition-[border-color,background-color,color] duration-150 focus-visible:ring-2 focus-visible:ring-primary/30 dark:text-slate-100',
  optionButtonDefault:
    'border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800/80',
  optionButtonSelected:
    'border-primary bg-[#f5f2ff] text-slate-900 dark:border-primary dark:bg-primary/10 dark:text-slate-100',
  optionButtonCorrect:
    'border-emerald-500 bg-emerald-50 text-slate-900 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-slate-100',
  optionButtonWrong:
    'border-rose-500 bg-rose-50 text-slate-900 dark:border-rose-400 dark:bg-rose-950/40 dark:text-slate-100',
  optionButtonLocked: 'cursor-default opacity-95',
  optionText: 'min-w-0 flex-1 text-left text-base leading-relaxed text-inherit',
  optionLetter:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100',
  optionLetterSelected:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white',
  optionLetterCorrect:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white',
  optionLetterWrong:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-white',
  feedbackBox:
    'rounded-xl border p-4 text-sm leading-relaxed',
  feedbackCorrect:
    'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
  feedbackWrong:
    'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200',
  minimap:
    'w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-20 lg:w-56',
  minimapGrid: 'grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-4',
  minimapItem:
    'flex h-9 w-full items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-150',
  minimapItemDefault:
    'border border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300',
  minimapItemAnswered:
    'border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20',
  minimapItemCurrent: 'border-2 border-primary bg-primary text-white shadow-sm',
  minimapLegendCurrent: 'border-2 border-primary bg-primary',
  minimapLegendAnswered: 'border border-primary/30 bg-primary/10',
  minimapLegendDefault: 'border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900',
} as const;
