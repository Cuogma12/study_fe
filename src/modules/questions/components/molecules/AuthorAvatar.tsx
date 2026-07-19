'use client';

import React from 'react';
import { Image } from '@/shared/components/atoms';

interface AuthorAvatarProps {
  username?: string | null;
  avatarUrl?: string | null;
  size?: 'sm' | 'md';
}

const sizeClass = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
};

export const AuthorAvatar = ({ username, avatarUrl, size = 'md' }: AuthorAvatarProps) => {
  if (avatarUrl) {
    return (
      <div className={`${sizeClass[size]} shrink-0 overflow-hidden rounded-full`}>
        <Image className="h-full w-full object-cover" src={avatarUrl} alt={username ?? ''} />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass[size]} flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200`}
    >
      {username?.charAt(0).toUpperCase() ?? '?'}
    </div>
  );
};
