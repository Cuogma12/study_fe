import React from 'react';
import { QuizBuilderPage } from '@/modules/quiz/pages/QuizBuilderPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function QuizBuilderRoute() {
  return (
    <AppShell showBottomNav={false}>
      <QuizBuilderPage />
    </AppShell>
  );
}
