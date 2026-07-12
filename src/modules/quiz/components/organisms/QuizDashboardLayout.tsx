'use client';

import { ReactNode } from 'react';
import { QuizDashboardMobileNav } from './QuizDashboardMobileNav';
import { QuizDashboardSidebar } from './QuizDashboardSidebar';

interface QuizDashboardLayoutProps {
  children: ReactNode;
}

export const QuizDashboardLayout = ({ children }: QuizDashboardLayoutProps) => {
  return (
    <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 bg-slate-50/60 dark:bg-slate-950/40">
      <QuizDashboardSidebar />
      <div className="scrollbar-nice min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <QuizDashboardMobileNav />
        {children}
      </div>
    </main>
  );
};
