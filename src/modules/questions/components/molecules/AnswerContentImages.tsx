'use client';

import React from 'react';
import { PreviewableImage } from '@/shared/components/molecules/PreviewableImage';

interface AnswerContentImagesProps {
  images?: string[] | null;
  compact?: boolean;
}

export const AnswerContentImages = ({ images, compact = false }: AnswerContentImagesProps) => {
  const urls = Array.isArray(images) ? images.filter(Boolean) : [];
  if (urls.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {urls.map((url) => (
          <PreviewableImage
            key={url}
            src={url}
            frameClassName="!w-20 !rounded-lg !border !p-0.5"
            imageClassName="!h-16 !w-full !rounded-md !object-cover"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {urls.map((url) => (
        <PreviewableImage key={url} src={url} imageClassName="max-h-72" />
      ))}
    </div>
  );
};
