import React from 'react';
import { QuizResultPage } from '@/modules/quiz/pages/QuizResultPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

interface QuizResultRouteProps {
  params: { id: string };
}

export default function QuizResultRoute({ params }: QuizResultRouteProps) {
  return (
    <AppShell showBottomNav={false}>
      <QuizResultPage attemptId={params.id} />
    </AppShell>
  );
}
