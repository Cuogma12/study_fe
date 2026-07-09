'use client';

import React from 'react';
import { GlobalHeader } from './GlobalHeader';
import { GlobalBottomNav } from './GlobalBottomNav';

interface AppShellProps {
  children: React.ReactNode;
  /** Không scroll cả trang — dùng cho home 3 cột */
  lockViewport?: boolean;
  showBottomNav?: boolean;
  showHeader?: boolean;
}

export const AppShell = ({
  children,
  lockViewport = false,
  showBottomNav = true,
  showHeader = true,
}: AppShellProps) => {
  if (lockViewport) {
    return (
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        {showHeader ? <GlobalHeader /> : null}
        <div className={`flex min-h-0 flex-1 flex-col ${showHeader ? 'pt-16' : ''}`}>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          {showBottomNav && <GlobalBottomNav />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh w-full flex-col">
      {showHeader ? <GlobalHeader /> : null}
      <div className={`flex-1 ${showHeader ? 'pt-16' : ''} ${showBottomNav ? 'pb-20 lg:pb-0' : ''}`}>
        {children}
      </div>
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <GlobalBottomNav />
        </div>
      )}
    </div>
  );
};
