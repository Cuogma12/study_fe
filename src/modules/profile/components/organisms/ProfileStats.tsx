'use client';
import React from 'react';
import { Text } from '@/shared/components/atoms';

export const ProfileStats = () => {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/5 shadow-sm outline outline-2 outline-dashed outline-red-500/80">
      <Text variant="body1" weight="bold" className="mb-4">Thống kê học tập</Text>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <Text variant="caption">Kinh nghiệm (XP)</Text>
            <Text variant="caption" className="!text-primary">Level 14</Text>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[80%] rounded-full shadow-[0_0_8px_rgba(72,72,229,0.5)]"></div>
          </div>
          <div className="flex justify-between mt-1">
            <Text variant="caption" className="!text-slate-400 !text-[10px]">3,200 XP</Text>
            <Text variant="caption" className="!text-slate-400 !text-[10px]">4,000 XP</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <Text variant="caption" weight="bold" className="!text-blue-500 uppercase !text-[10px]">Hỏi</Text>
            <Text variant="h4" weight="bold" className="!text-slate-900 dark:!text-white">128</Text>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl border border-purple-100 dark:border-purple-800/30">
            <Text variant="caption" weight="bold" className="!text-purple-500 uppercase !text-[10px]">Đáp</Text>
            <Text variant="h4" weight="bold" className="!text-slate-900 dark:!text-white">45</Text>
          </div>
        </div>
      </div>
    </section>
  );
};


