import React from 'react';
import { HomePage } from '@/modules/home/pages/HomePage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function Page() {
  return (
    <AppShell lockViewport>
      <HomePage />
    </AppShell>
  );
}
