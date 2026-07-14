'use client';

import { MaterialIcon, Text } from '@/shared/components/atoms';

interface AiTeaserCardProps {
  icon: string;
  title: string;
  description: string;
  accentClassName: string;
}

export const AiTeaserCard = ({
  icon,
  title,
  description,
  accentClassName,
}: AiTeaserCardProps) => {
  return (
    <div className="flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
      <div
        className={`flex aspect-square w-1/3 max-w-[140px] items-center justify-center rounded-lg ${accentClassName}`}
      >
        <MaterialIcon icon={icon} size={48} className="!text-[48px] text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <Text as="h4" variant="h3" className="!mb-1 !text-xl !font-semibold !text-slate-900">
          {title}
        </Text>
        <Text variant="body2" className="!text-slate-600">
          {description}
        </Text>
      </div>
    </div>
  );
};
