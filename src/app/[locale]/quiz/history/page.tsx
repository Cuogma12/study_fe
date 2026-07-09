import React, { Suspense } from 'react';
import { QuizHistoryPage } from '@/modules/quiz/pages/QuizHistoryPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function QuizHistoryRoute() {
  return (
    <AppShell lockViewport showBottomNav={false}>
      <Suspense fallback={null}>
        <QuizHistoryPage />
      </Suspense>
    </AppShell>
  );
}
