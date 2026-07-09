'use client';

import { Button } from '@/shared/components/atoms';

interface QuizPlayFooterProps {
  prevLabel: string;
  nextLabel: string;
  submitLabel: string;
  submittingLabel: string;
  canGoPrevious: boolean;
  canGoNext: boolean;
  canSubmit: boolean;
  submitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const QuizPlayFooter = ({
  prevLabel,
  nextLabel,
  submitLabel,
  submittingLabel,
  canGoPrevious,
  canGoNext,
  canSubmit,
  submitting,
  onPrevious,
  onNext,
  onSubmit,
}: QuizPlayFooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full border-t border-slate-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-[800px] flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="!h-11 gap-2 !px-6 !text-primary hover:!bg-primary/5"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          {prevLabel}
        </Button>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onNext}
            disabled={!canGoNext}
            className="!h-11 gap-2 !px-6"
          >
            {nextLabel}
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit || submitting}
            className="!h-11 gap-2 !bg-primary !px-6 shadow-sm hover:!bg-indigo-600"
          >
            {submitting ? submittingLabel : submitLabel}
            <span className="material-symbols-outlined text-[20px]">done_all</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};
