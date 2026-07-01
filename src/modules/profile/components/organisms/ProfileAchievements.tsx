'use client';
import React from 'react';
import { Text, TextLink, MaterialIcon } from '@/shared/components/atoms';

export const ProfileAchievements = () => {
  return (
    <section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm outline outline-dashed outline-2 outline-red-500/80 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <Text variant="body1" weight="bold">
          Huy hiệu & Thành tích
        </Text>
        <TextLink className="text-xs font-medium text-primary">Xem tất cả</TextLink>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div
          className="flex aspect-square items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/20"
          title="Top Contributor"
        >
          <MaterialIcon icon="emoji_events" type="filled" size="text-3xl" />
        </div>
        <div
          className="flex aspect-square items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-900/20"
          title="AI Explorer"
        >
          <MaterialIcon icon="psychology" type="filled" size="text-3xl" />
        </div>
        <div
          className="flex aspect-square items-center justify-center rounded-xl bg-green-50 text-green-500 dark:bg-green-900/20"
          title="Fast Learner"
        >
          <MaterialIcon icon="bolt" type="filled" size="text-3xl" />
        </div>
        <div
          className="flex aspect-square items-center justify-center rounded-xl bg-purple-50 text-purple-500 dark:bg-purple-900/20"
          title="Problem Solver"
        >
          <MaterialIcon icon="verified" type="filled" size="text-3xl" />
        </div>
      </div>
    </section>
  );
};
