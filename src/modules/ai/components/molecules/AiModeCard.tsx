'use client';

import { MaterialIcon, Text, Button } from '@/shared/components/atoms';

interface AiModeCardProps {
  icon: string;
  title: string;
  description: string;
  badgeText: string;
  actionText: string;
  active?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}

export const AiModeCard = ({
  icon,
  title,
  description,
  badgeText,
  actionText,
  active = false,
  disabled = false,
  onAction,
}: AiModeCardProps) => {
  return (
    <div
      className={`relative rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-all ${
        active
          ? 'border-2 border-primary hover:-translate-y-1'
          : 'border border-slate-200 opacity-80 grayscale'
      }`}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div
          className={`rounded-lg p-4 ${
            active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <MaterialIcon
            icon={icon}
            size={32}
            type={active ? 'filled' : 'outlined'}
            className="!text-[32px]"
          />
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
            active
              ? 'bg-primary text-white'
              : 'border border-teal-600 bg-teal-50 text-teal-800'
          }`}
        >
          {badgeText}
        </span>
      </div>

      <Text as="h3" variant="h3" className="!mb-2 !text-xl !font-semibold !text-slate-900">
        {title}
      </Text>
      <Text variant="body2" className="mb-8 !text-slate-600">
        {description}
      </Text>

      {disabled ? (
        <div className="flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-slate-100 py-2 font-semibold text-slate-400">
          {actionText}
        </div>
      ) : (
        <Button
          type="button"
          className="!flex !h-auto !w-full !items-center !justify-center !gap-2 !rounded-lg !bg-primary !py-2 !font-semibold !text-white hover:!bg-sky-700"
          onClick={onAction}
        >
          {actionText}
          <MaterialIcon icon="arrow_forward" size={18} className="!text-[18px]" />
        </Button>
      )}
    </div>
  );
};
