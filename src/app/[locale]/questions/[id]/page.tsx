import React from 'react';
import { QuestionDetailPage } from '@/modules/questions/pages/QuestionDetailPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <AppShell>
      <QuestionDetailPage questionId={params.id} />
    </AppShell>
  );
}
