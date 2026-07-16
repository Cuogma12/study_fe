'use client';

import { useEffect, useState } from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizAiGeneratingOverlayProps {
  open: boolean;
  title: string;
  subtitle?: string;
  tips: string[];
  questionCount?: number;
  questionCountLabel?: string;
}

const TIP_INTERVAL_MS = 3800;

export const QuizAiGeneratingOverlay = ({
  open,
  title,
  subtitle,
  tips,
  questionCount,
  questionCountLabel,
}: QuizAiGeneratingOverlayProps) => {
  const safeTips = tips.length > 0 ? tips : [subtitle ?? ''];
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setTipIndex(0);
      return;
    }

    if (safeTips.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setTipIndex((current) => (current + 1) % safeTips.length);
    }, TIP_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [open, safeTips.length]);

  if (!open) {
    return null;
  }

  const activeTip = safeTips[tipIndex] ?? safeTips[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="animate-quiz-ai-pop-in w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-100 to-primary/10 dark:from-violet-950/50 dark:to-primary/20" />
            <div className="absolute inset-1 rounded-full border border-primary/15" />
            <div className="relative flex h-14 w-14 animate-quiz-ai-float items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-800">
              <MaterialIcon icon="auto_awesome" size={28} className="!text-[28px] text-primary" />
            </div>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-quiz-ai-orbit rounded-full bg-violet-400/80"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-quiz-ai-orbit rounded-full bg-primary/70 [animation-delay:-1s]"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-quiz-ai-orbit rounded-full bg-fuchsia-400/70 [animation-delay:-2s]"
            />
          </div>

          <Text variant="h4" className="!font-bold !text-slate-800 dark:!text-slate-100">
            {title}
            <span className="inline-flex w-[1.4em] justify-start">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse [animation-delay:200ms]">.</span>
              <span className="animate-pulse [animation-delay:400ms]">.</span>
            </span>
          </Text>

          {subtitle ? (
            <Text variant="body2" className="mt-2 max-w-sm !text-slate-500">
              {subtitle}
            </Text>
          ) : null}

          {questionCount != null && questionCountLabel ? (
            <Text
              variant="small"
              className="mt-3 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 !font-medium !text-primary"
            >
              {questionCountLabel}
            </Text>
          ) : null}

          <div className="mt-5 min-h-[3.5rem] w-full max-w-sm">
            <Text
              key={tipIndex}
              variant="body2"
              className="animate-quiz-ai-tip-in !leading-relaxed !text-slate-600 dark:!text-slate-300"
            >
              {activeTip}
            </Text>
          </div>

          <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-2/5 animate-quiz-ai-shimmer rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
