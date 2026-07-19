'use client';

import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { AiChatComposer } from '@/modules/ai/components/organisms/AiChatComposer';
import { AiChatMessageList } from '@/modules/ai/components/organisms/AiChatMessageList';
import { useQuestionAiSidebar } from '../../hooks/useQuestionAiSidebar';

interface QuestionAiSidebarProps {
  questionId: string;
  questionTitle?: string | null;
}

export const QuestionAiSidebar = ({ questionId, questionTitle = null }: QuestionAiSidebarProps) => {
  const {
    t,
    tChat,
    ready,
    isAuthenticated,
    openFullscreen,
    goLogin,
    conversationId,
    messages,
    draft,
    setDraft,
    pendingImages,
    imageUploading,
    imageError,
    maxImages,
    loading,
    sending,
    error,
    bottomRef,
    welcomeText,
    sendMessage,
    uploadImage,
    removePendingImage,
  } = useQuestionAiSidebar({ questionId, questionTitle });

  return (
    <aside className="hidden w-full lg:block lg:w-[380px] xl:w-[400px]">
      <div className="sticky top-24 flex h-[calc(100vh-120px)] min-h-[420px] flex-col overflow-hidden rounded-xl border border-primary/20 bg-white shadow-xl dark:bg-slate-900">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-primary/10 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/30">
              <MaterialIcon icon="auto_awesome" size={20} className="!text-[20px]" />
            </div>
            <div className="min-w-0">
              <Text variant="body2" weight="bold" className="truncate">
                {t('title')}
              </Text>
              <Text
                variant="caption"
                className="flex items-center gap-1 !normal-case !tracking-normal !text-green-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {t('online')}
              </Text>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="!h-8 !shrink-0 !gap-1 !px-2 !text-xs !text-primary"
            onClick={openFullscreen}
            title={t('open_fullscreen')}
          >
            <MaterialIcon icon="open_in_full" size={16} className="!text-[16px]" />
            <span className="hidden xl:inline">{t('open_fullscreen')}</span>
          </Button>
        </div>

        {!ready ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <Text variant="body2" className="!text-slate-500">
              {tChat('thinking')}
            </Text>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <Text variant="body2" className="!text-slate-600">
              {t('login_required')}
            </Text>
            <Button type="button" size="sm" onClick={goLogin}>
              {t('login_action')}
            </Button>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex flex-1 items-center justify-center p-4">
                <Text variant="body2" className="!text-slate-500">
                  {tChat('thinking')}
                </Text>
              </div>
            ) : (
              <AiChatMessageList
                messages={messages}
                welcomeTitle={tChat('welcome_title')}
                welcomeText={welcomeText}
                thinkingLabel={tChat('thinking')}
                isThinking={sending}
                bottomRef={bottomRef}
                variant="compact"
              />
            )}

            {error ? (
              <div className="px-3 pb-1">
                <Text variant="caption" className="!normal-case !text-red-500">
                  {error}
                </Text>
              </div>
            ) : null}

            <AiChatComposer
              value={draft}
              placeholder={t('placeholder')}
              sendLabel={sending ? tChat('sending') : tChat('send')}
              disclaimer={t('disclaimer')}
              suggestion1={t('suggestion_1')}
              suggestion2={t('suggestion_2')}
              showSuggestions={!loading && messages.length === 0}
              disabled={loading || !conversationId}
              sending={sending}
              variant="compact"
              images={pendingImages}
              imageUploading={imageUploading}
              imageError={imageError}
              attachImageLabel={tChat('attach_image')}
              removeImageLabel={tChat('remove_image')}
              maxImages={maxImages}
              onChange={setDraft}
              onSend={() => void sendMessage(draft)}
              onSuggestion={(text) => void sendMessage(text)}
              onImagePick={(file) => void uploadImage(file)}
              onRemoveImage={removePendingImage}
            />
          </>
        )}
      </div>
    </aside>
  );
};
