'use client';

import React from 'react';
import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { CreateQuestionFormState } from './CreateQuestionForm';

interface CreateQuestionFooterProps {
  isAuthenticated: boolean;
  formState: CreateQuestionFormState;
}

export const CreateQuestionFooter = ({ isAuthenticated, formState }: CreateQuestionFooterProps) => {
  const { t, isFormValid, submitting, handleSubmit, handleCancel } = formState;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <footer className="mt-8 border-t border-slate-200 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="hidden md:flex flex-col">
          {isFormValid ? (
            <>
              <Text variant="small" className="!text-slate-500">
                {t('footer.ready_hint')}
              </Text>
              <Text variant="small" weight="medium" className="!text-primary">
                {t('footer.ready_action')}
              </Text>
            </>
          ) : (
            <Text variant="small" className="!text-slate-400">
              {t('footer.incomplete')}
            </Text>
          )}
        </div>

        <div className="flex w-full gap-3 md:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={submitting}
            className="flex-1 md:flex-none"
          >
            {t('actions.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-[2] md:flex-none"
          >
            {submitting ? (
              <>
                <MaterialIcon icon="progress_activity" className="mr-2 animate-spin" />
                {t('actions.submitting')}
              </>
            ) : (
              <>
                <MaterialIcon icon="send" className="mr-2" />
                {t('actions.submit')}
              </>
            )}
          </Button>
        </div>
      </div>
    </footer>
  );
};
