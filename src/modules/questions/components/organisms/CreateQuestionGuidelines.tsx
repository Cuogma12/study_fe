'use client';

import React from 'react';
import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

export const CreateQuestionGuidelines = () => {
  const t = useTranslations('create_question');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex gap-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <MaterialIcon icon="lightbulb" className="shrink-0 text-indigo-600" />
        <div>
          <Text variant="body2" weight="bold" className="mb-1 !text-indigo-700">
            {t('tips.title')}
          </Text>
          <Text variant="small" className="!text-slate-600">
            {t('tips.desc')}
          </Text>
        </div>
      </div>

      <div className="flex gap-4 rounded-xl border border-orange-200 bg-orange-50/50 p-4">
        <MaterialIcon icon="check_circle" className="shrink-0 text-orange-700" />
        <div>
          <Text variant="body2" weight="bold" className="mb-1 !text-orange-800">
            {t('rules.title')}
          </Text>
          <Text variant="small" className="!text-slate-600">
            {t('rules.desc')}
          </Text>
        </div>
      </div>
    </div>
  );
};
