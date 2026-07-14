'use client';

import { Text } from '@/shared/components/atoms';

interface AiHubStatsProps {
  items: { value: string; label: string }[];
}

export const AiHubStats = ({ items }: AiHubStatsProps) => {
  return (
    <div className="mt-16 grid grid-cols-2 gap-6 border-t border-slate-200 pt-12 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <Text as="div" variant="h2" className="!text-2xl !font-bold !text-primary">
            {item.value}
          </Text>
          <Text variant="body2" className="!font-semibold !text-slate-600">
            {item.label}
          </Text>
        </div>
      ))}
    </div>
  );
};
