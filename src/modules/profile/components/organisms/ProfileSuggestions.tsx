'use client';
import React from 'react';
import { Text, Button, MaterialIcon } from '@/shared/components/atoms';

export const ProfileSuggestions = () => {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/5 shadow-sm outline outline-2 outline-dashed outline-red-500/80">
      <Text variant="body1" weight="bold" className="mb-4">Gợi ý kết bạn</Text>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img alt="Peer" className="w-10 h-10 rounded-full border border-slate-200" src="https://ui-avatars.com/api/?name=Le+Hoang+Nam&background=random" />
          <div className="flex-1 overflow-hidden">
            <Text variant="body2" weight="bold" className="truncate">Lê Hoàng Nam</Text>
            <Text variant="caption" className="!text-slate-500 !text-[10px]">Chuyên gia Toán học</Text>
          </div>
          <Button variant="ghost" className="!p-1.5 !text-primary hover:bg-primary/10 !rounded-lg">
            <MaterialIcon icon="person_add" type="filled" size="text-lg" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <img alt="Peer" className="w-10 h-10 rounded-full border border-slate-200" src="https://ui-avatars.com/api/?name=Tran+Thu+Thao&background=random" />
          <div className="flex-1 overflow-hidden">
            <Text variant="body2" weight="bold" className="truncate">Trần Thu Thảo</Text>
            <Text variant="caption" className="!text-slate-500 !text-[10px]">Data Scientist</Text>
          </div>
          <Button variant="ghost" className="!p-1.5 !text-primary hover:bg-primary/10 !rounded-lg">
            <MaterialIcon icon="person_add" type="filled" size="text-lg" />
          </Button>
        </div>
      </div>
    </section>
  );
};


