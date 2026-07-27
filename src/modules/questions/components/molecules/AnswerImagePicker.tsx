'use client';

import React, { useRef } from 'react';
import { Button, IconButton, Image, MaterialIcon, Text } from '@/shared/components/atoms';
import { HiddenFileInput } from '@/shared/components/molecules/HiddenFileInput';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/shared/services/cloudinary.service';
import { useTranslations } from 'next-intl';

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface AnswerImagePickerProps {
  images: string[];
  disabled?: boolean;
  onChange: (images: string[]) => void;
}

export const AnswerImagePicker = ({ images, disabled, onChange }: AnswerImagePickerProps) => {
  const t = useTranslations('create_question');
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const addImage = (url: string) => {
    onChange([...images, url]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) {
      return;
    }

    if (images.length >= MAX_IMAGES) {
      setError(t('errors.images_max', { max: MAX_IMAGES }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(t('errors.image_too_large'));
      return;
    }

    if (!isCloudinaryConfigured()) {
      setError(t('errors.cloudinary_not_configured'));
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, 'posts');
      addImage(url);
    } catch {
      setError(t('errors.image_upload_failed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {images.map((url, index) => (
          <div key={`${url}-${index}`} className="group relative h-16 w-16">
            <div className="h-full w-full overflow-hidden rounded-lg border border-gray-300 dark:border-slate-600">
              <Image src={url} alt="" className="h-full w-full object-cover" />
            </div>
            <IconButton
              label={t('remove_image')}
              onClick={() => removeImage(index)}
              disabled={disabled || uploading}
              className="!absolute -right-1.5 -top-1.5 !h-5 !w-5 !min-w-5 !bg-rose-600 !text-white shadow-md hover:!scale-110 hover:!bg-rose-600"
            >
              <MaterialIcon icon="close" size="text-sm" className="text-white" />
            </IconButton>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => fileRef.current?.click()}
            disabled={disabled || uploading}
            className="!h-16 !w-16 !flex-col !gap-0 !rounded-lg !border-2 !border-dashed !border-gray-300 !bg-slate-50 !p-0 !text-slate-500 hover:!border-primary hover:!text-primary dark:!border-slate-600 dark:!bg-slate-800/50"
          >
            {uploading ? (
              <MaterialIcon icon="progress_activity" className="animate-spin text-primary" />
            ) : (
              <MaterialIcon icon="add_a_photo" size="text-lg" />
            )}
          </Button>
        )}
      </div>

      <HiddenFileInput
        ref={fileRef}
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImagePick}
      />

      {error && (
        <Text variant="small" className="!text-rose-500">
          {error}
        </Text>
      )}
    </div>
  );
};
