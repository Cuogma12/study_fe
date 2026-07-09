import React from 'react';
import { QuizPlayPage } from '@/modules/quiz/pages/QuizPlayPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function QuizPlayRoute() {
  return (
    <AppShell showBottomNav={false} showHeader={false} lockViewport>
      <QuizPlayPage />
    </AppShell>
  );
}
