'use client';

import { Button, Text } from '@/shared/components/atoms';
import { AiHubStats } from '../molecules/AiHubStats';
import { AiModeCard } from '../molecules/AiModeCard';
import { AiTeaserCard } from '../molecules/AiTeaserCard';

interface AiHubViewProps {
  title: string;
  subtitle: string;
  activeBadge: string;
  startAction: string;
  comingSoon: string;
  unavailable: string;
  tutorTitle: string;
  tutorDescription: string;
  explainTitle: string;
  explainDescription: string;
  generateTitle: string;
  generateDescription: string;
  techTitle: string;
  techDescription: string;
  personalTitle: string;
  personalDescription: string;
  stats: { value: string; label: string }[];
  onStartTutor: () => void;
}

export const AiHubView = ({
  title,
  subtitle,
  activeBadge,
  startAction,
  comingSoon,
  unavailable,
  tutorTitle,
  tutorDescription,
  explainTitle,
  explainDescription,
  generateTitle,
  generateDescription,
  techTitle,
  techDescription,
  personalTitle,
  personalDescription,
  stats,
  onStartTutor,
}: AiHubViewProps) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Text as="h1" variant="h1" className="!mb-2 !text-3xl !font-bold !text-slate-900">
          {title}
        </Text>
        <Text variant="body1" className="!text-slate-600">
          {subtitle}
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <AiModeCard
          icon="auto_awesome"
          title={tutorTitle}
          description={tutorDescription}
          badgeText={activeBadge}
          actionText={startAction}
          active
          onAction={onStartTutor}
        />
        <AiModeCard
          icon="lightbulb"
          title={explainTitle}
          description={explainDescription}
          badgeText={comingSoon}
          actionText={unavailable}
          disabled
        />
        <AiModeCard
          icon="psychology_alt"
          title={generateTitle}
          description={generateDescription}
          badgeText={comingSoon}
          actionText={unavailable}
          disabled
        />
      </div>

      <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <AiTeaserCard
          icon="memory"
          title={techTitle}
          description={techDescription}
          accentClassName="bg-gradient-to-br from-sky-50 to-teal-50"
        />
        <AiTeaserCard
          icon="person"
          title={personalTitle}
          description={personalDescription}
          accentClassName="bg-gradient-to-br from-teal-50 to-slate-100"
        />
      </section>

      <AiHubStats items={stats} />
    </main>
  );
};
