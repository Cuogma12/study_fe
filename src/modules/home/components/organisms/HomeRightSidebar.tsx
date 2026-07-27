'use client';

import React from 'react';
import { useHomeRightSidebar } from '../../hooks/useHomeRightSidebar';
import { HomeAiAssistantCard } from '../molecules/HomeAiAssistantCard';

export const HomeRightSidebar = () => {
  const { t, openAiHub, openTutor } = useHomeRightSidebar();

  return (
    <aside className="scrollbar-nice hidden min-h-0 w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-slate-200 py-6 pl-4 pr-4 dark:border-slate-700 lg:flex">
      <HomeAiAssistantCard
        title={t('ai_assistant')}
        onlineLabel={t('online')}
        welcome={t('ai_welcome')}
        openHubLabel={t('open_hub')}
        openTutorLabel={t('open_tutor')}
        onOpenHub={openAiHub}
        onOpenTutor={openTutor}
      />
    </aside>
  );
};
