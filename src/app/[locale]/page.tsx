import React from 'react';
import { HomePage } from '@/modules/home/pages/HomePage';
import { GlobalHeader } from '@/shared/components/organisms/GlobalHeader';
import { GlobalBottomNav } from '@/shared/components/organisms/GlobalBottomNav';

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <GlobalHeader />
      <HomePage />
      <GlobalBottomNav />
    </div>
  );
}
