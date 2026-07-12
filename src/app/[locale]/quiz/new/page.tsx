import React, { Suspense } from 'react';
import { QuizBuilderPage } from '@/modules/quiz/pages/QuizBuilderPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function QuizBuilderRoute() {
  return (
    <AppShell lockViewport showBottomNav={false}>
      <Suspense fallback={null}>
        <QuizBuilderPage />
      </Suspense>
    </AppShell>
  );
}
