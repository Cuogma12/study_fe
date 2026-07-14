'use client';

import { Button, Text } from '@/shared/components/atoms';

interface QuizModeSelectModalProps {
  open: boolean;
  title: string;
  description: string;
  practiceTitle: string;
  practiceDescription: string;
  examTitle: string;
  examDescription: string;
  cancelText: string;
  confirming?: boolean;
  onSelectPractice: () => void;
  onSelectExam: () => void;
  onCancel: () => void;
}

export const QuizModeSelectModal = ({
  open,
  title,
  description,
  practiceTitle,
  practiceDescription,
  examTitle,
  examDescription,
  cancelText,
  confirming = false,
  onSelectPractice,
  onSelectExam,
  onCancel,
}: QuizModeSelectModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"
        aria-label={cancelText}
        disabled={confirming}
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-mode-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-gray-300 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <Text id="quiz-mode-title" variant="h4" className="!font-bold">
          {title}
        </Text>
        <Text variant="body2" className="mt-2 !text-slate-500">
          {description}
        </Text>

        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            disabled={confirming}
            onClick={onSelectPractice}
            className="rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:opacity-60 dark:border-slate-600"
          >
            <Text variant="body1" className="!font-semibold">
              {practiceTitle}
            </Text>
            <Text variant="caption" className="mt-1 !text-slate-500">
              {practiceDescription}
            </Text>
          </button>
          <button
            type="button"
            disabled={confirming}
            onClick={onSelectExam}
            className="rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:opacity-60 dark:border-slate-600"
          >
            <Text variant="body1" className="!font-semibold">
              {examTitle}
            </Text>
            <Text variant="caption" className="mt-1 !text-slate-500">
              {examDescription}
            </Text>
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" disabled={confirming} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};
