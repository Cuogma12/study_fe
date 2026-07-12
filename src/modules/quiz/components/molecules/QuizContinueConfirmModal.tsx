'use client';

import { Button, Text } from '@/shared/components/atoms';

interface QuizContinueConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  confirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const QuizContinueConfirmModal = ({
  open,
  title,
  description,
  confirmText,
  cancelText,
  confirming = false,
  onConfirm,
  onCancel,
}: QuizContinueConfirmModalProps) => {
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
        aria-labelledby="quiz-continue-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-gray-300 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <Text id="quiz-continue-title" variant="h4" className="!font-bold">
          {title}
        </Text>
        <Text variant="body2" className="mt-2 !text-slate-500">
          {description}
        </Text>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" size="sm" disabled={confirming} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button size="sm" disabled={confirming} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
