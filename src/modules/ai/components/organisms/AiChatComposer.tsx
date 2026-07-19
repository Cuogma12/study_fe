'use client';

import { useRef } from 'react';
import { Button, IconButton, Image, MaterialIcon, Text, Textarea } from '@/shared/components/atoms';
import { HiddenFileInput } from '@/shared/components/molecules/HiddenFileInput';

interface AiChatComposerProps {
  value: string;
  placeholder: string;
  sendLabel: string;
  disclaimer: string;
  suggestion1: string;
  suggestion2: string;
  showSuggestions?: boolean;
  disabled?: boolean;
  sending?: boolean;
  variant?: 'full' | 'compact';
  images?: string[];
  imageUploading?: boolean;
  imageError?: string | null;
  attachImageLabel?: string;
  removeImageLabel?: string;
  maxImages?: number;
  onChange: (value: string) => void;
  onSend: () => void;
  onSuggestion: (text: string) => void;
  onImagePick?: (file: File) => void;
  onRemoveImage?: (index: number) => void;
}

export const AiChatComposer = ({
  value,
  placeholder,
  sendLabel,
  disclaimer,
  suggestion1,
  suggestion2,
  showSuggestions = true,
  disabled = false,
  sending = false,
  variant = 'full',
  images = [],
  imageUploading = false,
  imageError = null,
  attachImageLabel = '',
  removeImageLabel = '',
  maxImages = 3,
  onChange,
  onSend,
  onSuggestion,
  onImagePick,
  onRemoveImage,
}: AiChatComposerProps) => {
  const isCompact = variant === 'compact';
  const fileRef = useRef<HTMLInputElement>(null);
  const canAttachImages = Boolean(onImagePick);
  const canSend = Boolean(value.trim() || images.length > 0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!disabled && !sending && canSend) {
        onSend();
      }
    }
  };

  const handleImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file && onImagePick) {
      onImagePick(file);
    }
  };

  return (
    <div
      className={`shrink-0 ${
        isCompact ? 'border-t border-primary/10 bg-white p-3 pt-2' : 'bg-[#f6f6f8] px-6 pb-4 pt-2'
      }`}
    >
      {showSuggestions ? (
        <div className={`mb-3 flex flex-wrap gap-2 ${isCompact ? 'mb-2' : 'mb-4'}`}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || sending}
            onClick={() => onSuggestion(suggestion1)}
            className={`!inline-flex !items-center !gap-1 !rounded-full !border !border-slate-200 !bg-slate-50 !font-medium !text-slate-600 hover:!bg-slate-100 dark:!border-slate-700 dark:!bg-slate-800 ${
              isCompact
                ? '!h-auto !px-2.5 !py-1 !text-[11px]'
                : '!h-auto !px-4 !py-2 !text-xs !shadow-sm'
            }`}
          >
            <MaterialIcon icon="menu_book" size={14} className="!text-[14px]" />
            {suggestion1}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || sending}
            onClick={() => onSuggestion(suggestion2)}
            className={`!inline-flex !items-center !gap-1 !rounded-full !border !border-slate-200 !bg-slate-50 !font-medium !text-slate-600 hover:!bg-slate-100 dark:!border-slate-700 dark:!bg-slate-800 ${
              isCompact
                ? '!h-auto !px-2.5 !py-1 !text-[11px]'
                : '!h-auto !px-4 !py-2 !text-xs !shadow-sm'
            }`}
          >
            <MaterialIcon icon="lightbulb" size={14} className="!text-[14px]" />
            {suggestion2}
          </Button>
        </div>
      ) : null}

      {images.length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-2">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative h-16 w-16">
              <div className="h-full w-full overflow-hidden rounded-lg border border-slate-200">
                <Image src={url} alt="" className="h-full w-full object-cover" />
              </div>
              <IconButton
                label={removeImageLabel}
                disabled={disabled || sending}
                onClick={() => onRemoveImage?.(index)}
                className="!absolute -right-1.5 -top-1.5 !h-5 !w-5 !min-w-5 !bg-rose-600 !text-white shadow hover:!bg-rose-600"
              >
                <MaterialIcon icon="close" size={12} className="!text-[12px] text-white" />
              </IconButton>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={`flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary dark:border-slate-700 dark:bg-slate-800 ${
          isCompact ? 'p-1.5' : 'p-2 shadow-sm'
        }`}
      >
        {canAttachImages ? (
          <>
            <IconButton
              label={attachImageLabel}
              title={attachImageLabel}
              disabled={disabled || sending || imageUploading || images.length >= maxImages}
              onClick={() => fileRef.current?.click()}
              size={isCompact ? 'sm' : 'md'}
              className="mb-0.5 !text-slate-500 hover:!bg-slate-200 hover:!text-primary"
            >
              <MaterialIcon
                icon={imageUploading ? 'progress_activity' : 'add_photo_alternate'}
                size={20}
                className={imageUploading ? 'animate-spin !text-[20px]' : '!text-[20px]'}
              />
            </IconButton>
            <HiddenFileInput
              ref={fileRef}
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImagePick}
            />
          </>
        ) : null}
        <div className="min-w-0 flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || sending}
            placeholder={placeholder}
            rows={1}
            hideErrorMessage
            className={`!resize-none !border-none !bg-transparent !p-0 !shadow-none outline-none placeholder:text-slate-400 focus:!border-transparent focus:!ring-0 disabled:opacity-60 ${
              isCompact
                ? '!max-h-[80px] !min-h-[36px] !px-2 !py-2 !text-sm'
                : '!max-h-[120px] !min-h-[44px] !px-2 !py-3 !text-base'
            }`}
          />
        </div>
        <IconButton
          label={sendLabel}
          disabled={disabled || sending || !canSend}
          onClick={onSend}
          size={isCompact ? 'sm' : 'md'}
          className="mb-0.5 !bg-primary !text-white hover:!bg-primary hover:!opacity-90 disabled:!opacity-40"
        >
          <MaterialIcon
            icon="send"
            size={isCompact ? 16 : 20}
            className={isCompact ? '!text-[16px]' : '!text-[20px]'}
          />
        </IconButton>
      </div>

      {imageError ? (
        <Text variant="caption" className="mt-1 block !normal-case !text-rose-500">
          {imageError}
        </Text>
      ) : null}

      <Text
        variant="caption"
        className="mt-2 block text-center !normal-case !tracking-normal !text-slate-400"
      >
        {disclaimer}
      </Text>
    </div>
  );
};
