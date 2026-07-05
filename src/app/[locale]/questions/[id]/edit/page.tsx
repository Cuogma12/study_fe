import React from 'react';
import { EditQuestionPage } from '@/modules/questions/pages/EditQuestionPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

interface PageProps {
  params: { id: string };
}

export default function EditQuestionRoute({ params }: PageProps) {
  return (
    <AppShell showBottomNav={false}>
      <EditQuestionPage questionId={params.id} />
    </AppShell>
  );
}
