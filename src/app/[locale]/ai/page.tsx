import React from 'react';
import { AiHubPage } from '@/modules/ai/pages/AiHubPage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function AiRoute() {
  return (
    <AppShell showBottomNav={false}>
      <AiHubPage />
    </AppShell>
  );
}
