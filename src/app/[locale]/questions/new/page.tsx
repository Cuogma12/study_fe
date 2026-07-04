import React from 'react';
import { CreateQuestionPage } from '@/modules/questions/pages/CreateQuestionPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function NewQuestionRoute() {
  return (
    <AppShell showBottomNav={false}>
      <CreateQuestionPage />
    </AppShell>
  );
}
