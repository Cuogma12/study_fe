'use client';

import { ReactNode } from 'react';
import { QuizDashboardMobileNav } from './QuizDashboardMobileNav';
import { QuizDashboardSidebar } from './QuizDashboardSidebar';

interface QuizDashboardLayoutProps {
  children: ReactNode;
}

export const QuizDashboardLayout = ({ children }: QuizDashboardLayoutProps) => {
  return (
    <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 px-4 lg:gap-8 lg:px-10">
      <QuizDashboardSidebar />
      <div className="scrollbar-nice min-h-0 min-w-0 flex-1 overflow-y-auto py-6 lg:pl-2">
        <QuizDashboardMobileNav />
        {children}
      </div>
    </main>
  );
};
