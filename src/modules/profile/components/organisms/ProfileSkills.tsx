'use client';
import React from 'react';
import { Text, Button } from '@/shared/components/atoms';

export const ProfileSkills = () => {
  return (
    <section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm outline outline-dashed outline-2 outline-red-500/80 dark:bg-slate-900">
      <Text variant="body1" weight="bold" className="mb-4">
        Kỹ năng nổi bật
      </Text>
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <Text variant="caption" weight="medium">
              Python & AI
            </Text>
            <Text variant="caption" weight="bold" className="!text-primary">
              85%
            </Text>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[85%] rounded-full bg-primary"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <Text variant="caption" weight="medium">
              Tiếng Anh chuyên ngành
            </Text>
            <Text variant="caption" weight="bold" className="!text-primary">
              72%
            </Text>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[72%] rounded-full bg-primary"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <Text variant="caption" weight="medium">
              Giải thuật & Cấu trúc DL
            </Text>
            <Text variant="caption" weight="bold" className="!text-primary">
              64%
            </Text>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[64%] rounded-full bg-primary"></div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="mt-2 w-full !rounded-xl border border-primary/20 py-2 !text-primary hover:bg-primary/5"
        >
          Phân tích chi tiết
        </Button>
      </div>
    </section>
  );
};
