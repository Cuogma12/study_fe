'use client';

import React from 'react';
import { Text, Button, MaterialIcon } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl: string;
  role: string;
}

export const ProfileHeader = ({ fullName, avatarUrl, role }: ProfileHeaderProps) => {
  const t = useTranslations();

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm dark:bg-slate-900">
      <div className="relative h-48 bg-slate-200 outline outline-2 outline-offset-[-2px] outline-red-500/80 md:h-64 dark:bg-slate-800">
        <img
          alt={t('profile.cover_alt')}
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBGYnM2oEMO091O1aJdVBbGLSVOK23Zs0Yk5Z8PfQxOTqRaUdzmWEOsSPb5HkIvlg3EEduPUKADSee5alU6wyQ4KIEIwYRx0jJD0kg_oYttHMFjzbx3ihqQ7UcVZckAgBDw81whRGV33bREtL9e3IGNpZY0-eBqUI72QVuoB28jDNB2M59YVbfpyl7XAVaVOxiyv54PySWTMcshSAgctKps_jPZKgfPBUs7OvBTOfIdmvSli2sz2C"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            className="!bg-white/20 !text-white backdrop-blur-md hover:!bg-white/30"
          >
            <MaterialIcon icon="photo_camera" size={18} />
            {t('profile.edit_cover')}
          </Button>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-6 pt-0">
        <div className="-mt-12 flex flex-col items-end justify-between gap-4 md:-mt-16 md:flex-row md:items-end">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:text-left">
            <div className="relative">
              <img
                alt={t('profile.avatar_alt')}
                className="h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-lg md:h-40 md:w-40 dark:border-slate-900"
                src={avatarUrl}
              />
              <div className="absolute bottom-2 right-2 rounded-full border-2 border-white bg-primary px-2 py-0.5 dark:border-slate-900">
                <Text variant="caption" weight="bold" className="!text-white">
                  {role}
                </Text>
              </div>
            </div>

            <div className="pb-2">
              <Text
                variant="h1"
                weight="bold"
                className="text-3xl !text-slate-900 dark:!text-white"
              >
                {fullName}
              </Text>
              <div className="mt-2 flex items-center justify-center gap-4 rounded p-1 text-slate-500 outline outline-dashed outline-2 outline-red-500/80 md:justify-start dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Text
                    as="strong"
                    variant="body2"
                    weight="bold"
                    className="!text-slate-900 dark:!text-white"
                  >
                    1.2k
                  </Text>
                  <Text as="span" variant="body2">
                    Người theo dõi
                  </Text>
                </div>
                <div className="flex items-center gap-1">
                  <Text
                    as="strong"
                    variant="body2"
                    weight="bold"
                    className="!text-slate-900 dark:!text-white"
                  >
                    458
                  </Text>
                  <Text as="span" variant="body2">
                    Đang theo dõi
                  </Text>
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-500">
                  <MaterialIcon icon="stars" type="filled" size="text-sm" />
                  <Text as="span" variant="body2">
                    2,450 Điểm
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pb-2">
            <Button className="flex items-center gap-2 !rounded-xl !bg-primary !px-5 !py-2.5 !font-medium !text-white shadow-md shadow-primary/20 hover:!opacity-90">
              <MaterialIcon icon="add" type="filled" size="text-sm" /> Theo dõi
            </Button>
            <Button
              variant="ghost"
              className="!rounded-xl border border-primary/20 !p-2.5 !text-primary transition-colors hover:!bg-primary/5"
            >
              <MaterialIcon icon="mail_outline" type="filled" />
            </Button>
            <Button
              variant="ghost"
              className="!rounded-xl border border-slate-200 !p-2.5 !text-slate-500 transition-colors hover:!bg-slate-50 dark:border-slate-700"
            >
              <MaterialIcon icon="more_horiz" type="filled" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
