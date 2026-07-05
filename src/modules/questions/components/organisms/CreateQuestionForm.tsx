'use client';

import React, { useRef } from 'react';
import { Label, Select, Input, MaterialIcon, Text } from '@/shared/components/atoms';
import { FIELD_ERROR_STYLES } from '@/shared/utils/fieldErrorStyles';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/shared/services/cloudinary.service';
import { FieldErrorMessage } from '../molecules/FieldErrorMessage';
import { CreateQuestionLoginOverlay } from './CreateQuestionLoginOverlay';
import { useQuestionForm } from '../../hooks/useCreateQuestion';

export type CreateQuestionFormState = ReturnType<typeof useQuestionForm>;

interface CreateQuestionFormProps {
  isAuthenticated: boolean;
  formState: CreateQuestionFormState;
}

export const CreateQuestionForm = ({ isAuthenticated, formState }: CreateQuestionFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    t,
    form,
    errors,
    showError,
    submitted,
    submitting,
    submitError,
    errorSummaryItems,
    subjectsLoading,
    subjectOptions,
    topicOptions,
    topicsLoading,
    gradeOptions,
    imageUploading,
    setImageUploading,
    imageError,
    setImageError,
    setField,
    handleBlur,
    addImage,
    removeImage,
    maxImages,
  } = formState;

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) {
      return;
    }

    if (form.images.length >= maxImages) {
      setImageError(t('errors.images_max', { max: maxImages }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError(t('errors.image_too_large'));
      return;
    }

    if (!isCloudinaryConfigured()) {
      setImageError(t('errors.cloudinary_not_configured'));
      return;
    }

    setImageError(null);
    setImageUploading(true);
    try {
      const url = await uploadToCloudinary(file, 'posts');
      addImage(url);
    } catch {
      setImageError(t('errors.image_upload_failed'));
    } finally {
      setImageUploading(false);
    }
  };

  const contentFieldClass = showError('content')
    ? FIELD_ERROR_STYLES.required.field
    : 'border-slate-300 bg-slate-50 focus:border-primary focus:ring-2 focus:ring-primary';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
      <div
        className={`p-6 md:p-8 ${!isAuthenticated ? 'pointer-events-none select-none opacity-30 blur-[4px]' : ''} ${submitting ? 'pointer-events-none opacity-60' : ''}`}
      >
        {submitted && errorSummaryItems.length > 0 && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <MaterialIcon icon="error" className="mt-0.5 shrink-0 text-rose-600" />
            <div>
              <Text variant="body2" weight="bold" className="!text-rose-900">
                {t('error_summary.title')}
              </Text>
              <ul className="mt-1 list-inside list-disc text-sm text-rose-800/90">
                {errorSummaryItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {submitError}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">
              {t('fields.subject')} <span className="text-rose-500">*</span>
            </Label>
            <Select
              value={form.subject_id}
              onChange={(e) => setField('subject_id', e.target.value)}
              onBlur={() => handleBlur('subject_id')}
              options={subjectOptions}
              placeholder={t('placeholders.subject')}
              disabled={subjectsLoading || submitting}
              error={showError('subject_id') ? errors.subject_id?.message : undefined}
              errorTone={errors.subject_id?.tone}
              hideErrorMessage
              className="!h-11 !py-2.5"
            />
            {showError('subject_id') && errors.subject_id && (
              <FieldErrorMessage
                message={errors.subject_id.message}
                tone={errors.subject_id.tone}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">
              {t('fields.grade')} <span className="text-rose-500">*</span>
            </Label>
            <Select
              value={form.grade_level}
              onChange={(e) => setField('grade_level', e.target.value)}
              onBlur={() => handleBlur('grade_level')}
              options={gradeOptions}
              placeholder={t('placeholders.grade')}
              disabled={submitting}
              error={showError('grade_level') ? errors.grade_level?.message : undefined}
              errorTone={errors.grade_level?.tone}
              hideErrorMessage
              className="!h-11 !py-2.5"
            />
            {showError('grade_level') && errors.grade_level && (
              <FieldErrorMessage
                message={errors.grade_level.message}
                tone={errors.grade_level.tone}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">{t('fields.topic')}</Label>
            <Select
              value={form.topic_id}
              onChange={(e) => setField('topic_id', e.target.value)}
              options={topicOptions}
              placeholder={
                !form.subject_id
                  ? t('placeholders.topic_disabled')
                  : !form.grade_level
                    ? t('placeholders.topic_grade_disabled')
                    : topicsLoading
                      ? t('placeholders.topic_loading')
                      : topicOptions.length === 0
                        ? t('placeholders.topic_empty')
                        : t('placeholders.topic')
              }
              disabled={
                !form.subject_id || !form.grade_level || topicsLoading || submitting
              }
              className="!h-11 !py-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">
              {t('fields.title')} <span className="text-rose-500">*</span>
            </Label>
            <Input
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              placeholder={t('placeholders.title')}
              disabled={submitting}
              error={showError('title') ? errors.title?.message : undefined}
              errorTone={errors.title?.tone}
              hideErrorMessage
              className="!h-12 !py-3 !text-base font-medium"
            />
            {showError('title') && errors.title && (
              <FieldErrorMessage message={errors.title.message} tone={errors.title.tone} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">
              {t('fields.content')} <span className="text-rose-500">*</span>
            </Label>
            <textarea
                value={form.content}
                onChange={(e) => setField('content', e.target.value)}
                onBlur={() => handleBlur('content')}
                disabled={submitting}
                rows={6}
                placeholder={t('placeholders.content')}
                className={`w-full resize-none rounded-lg border p-4 text-sm outline-none transition-all placeholder:text-slate-400 ${contentFieldClass}`}
              />
            {showError('content') && errors.content && (
              <FieldErrorMessage message={errors.content.message} tone={errors.content.tone} />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-sm font-semibold">
              {form.images.length > 0
                ? t('fields.images_count', { count: form.images.length })
                : t('fields.images')}
            </Label>

            <div className="flex flex-wrap gap-3">
              {form.images.map((url, index) => (
                <div key={`${url}-${index}`} className="group relative h-20 w-20">
                  <div className="h-full w-full overflow-hidden rounded-xl border border-slate-300">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={submitting}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white shadow-md transition-transform hover:scale-110"
                    aria-label={t('remove_image')}
                  >
                    <MaterialIcon icon="close" size="text-base" className="text-white" />
                  </button>
                </div>
              ))}

              {form.images.length < maxImages && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={submitting || imageUploading}
                  className="flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-all hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  {imageUploading ? (
                    <MaterialIcon icon="progress_activity" className="animate-spin text-primary" />
                  ) : (
                    <>
                      <MaterialIcon icon="add_a_photo" />
                      <span className="text-[10px] font-bold">{t('add_image')}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImagePick}
            />

            {imageError && <p className="text-xs text-rose-500">{imageError}</p>}
            <p className="text-xs text-slate-400">{t('images_hint')}</p>
          </div>
        </div>
      </div>

      {!isAuthenticated && <CreateQuestionLoginOverlay />}
    </div>
  );
};
