import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { HomePage } from '@/modules/home/pages/HomePage';
import { AppShell } from '@/shared/components/organisms/AppShell';
import { Text } from '@/shared/components/atoms';

export default async function Page() {
  const t = await getTranslations('home.feed');

  return (
    <AppShell lockViewport>
      <Suspense
        fallback={
          <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-center justify-center px-4 lg:px-10">
            <Text variant="body2" className="!text-slate-500">
              {t('loading')}
            </Text>
          </main>
        }
      >
        <HomePage />
      </Suspense>
    </AppShell>
  );
}
