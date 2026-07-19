'use client';

import { IconButton, MaterialIcon, Tag, Text } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAiTutorChat } from '../../hooks/useAiTutorChat';
import { AiConversationListItem } from '../../types/ai';
import { AiChatComposer } from './AiChatComposer';
import { AiChatMessageList } from './AiChatMessageList';
import { AiConversationSidebar } from './AiConversationSidebar';

interface AiTutorChatProps {
  questionId?: string | null;
  initialConversationId?: string | null;
  newChatKey?: string | null;
}

export const AiTutorChat = ({
  questionId,
  initialConversationId,
  newChatKey,
}: AiTutorChatProps) => {
  const { navigateTo, replaceTo } = useAppNavigation();
  const {
    t,
    conversationId,
    messages,
    draft,
    setDraft,
    pendingImages,
    imageUploading,
    imageError,
    maxImages,
    historyItems,
    historyLoading,
    historyError,
    loading,
    sending,
    error,
    bottomRef,
    welcomeText,
    contextBanner,
    sendMessage,
    uploadImage,
    removePendingImage,
  } = useAiTutorChat({ questionId, initialConversationId, newChatKey });

  const selectConversation = (item: AiConversationListItem) => {
    if (item.question_id) {
      replaceTo(`/ai?mode=tutor&question_id=${item.question_id}`);
      return;
    }
    replaceTo(`/ai?mode=tutor&conversation_id=${item.id}`);
  };

  const startNewConversation = () => {
    replaceTo(`/ai?mode=tutor&new=${Date.now()}`);
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-[1200px] flex-col overflow-hidden bg-[#f6f6f8] md:flex-row">
      <AiConversationSidebar
        items={historyItems}
        activeConversationId={conversationId}
        loading={historyLoading}
        error={historyError}
        title={t('history_title')}
        newChatLabel={t('new_chat')}
        loadingLabel={t('history_loading')}
        emptyLabel={t('history_empty')}
        untitledLabel={t('untitled')}
        messageCountLabel={(count) => t('message_count', { count })}
        onNewChat={startNewConversation}
        onSelect={selectConversation}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center border-b border-slate-200 bg-white px-6 py-4">
          <IconButton
            label={t('back')}
            onClick={() => navigateTo('/ai')}
            className="-ml-2 !text-slate-500 hover:!bg-slate-100 hover:!text-primary"
          >
            <MaterialIcon icon="arrow_back" />
          </IconButton>

          <div className="ml-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MaterialIcon icon="auto_awesome" size={20} className="!text-[20px]" />
            </div>
            <div className="flex items-center gap-2">
              <Text as="h1" variant="h3" className="!text-xl !font-semibold">
                {t('title')}
              </Text>
              <Tag
                icon={<span className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                className="!gap-1 !rounded-full !bg-green-50 !px-2 !py-0.5 !text-xs !font-medium !normal-case !text-green-700"
              >
                {t('online')}
              </Tag>
            </div>
          </div>
        </header>

        {questionId ? (
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-6 py-2 text-sm text-slate-600">
            <MaterialIcon icon="link" size={16} className="!text-[16px] text-slate-500" />
            <Text as="span" variant="body2" className="!normal-case !text-slate-600">
              {contextBanner}
            </Text>
          </div>
        ) : null}

        {loading ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <Text variant="body2" className="!text-slate-500">
              {t('thinking')}
            </Text>
          </div>
        ) : (
          <AiChatMessageList
            messages={messages}
            welcomeTitle={t('welcome_title')}
            welcomeText={welcomeText}
            thinkingLabel={t('thinking')}
            isThinking={sending}
            bottomRef={bottomRef}
          />
        )}

        {error ? (
          <div className="px-6 pb-2">
            <Text variant="caption" className="!normal-case !text-red-500">
              {error}
            </Text>
          </div>
        ) : null}

        <AiChatComposer
          value={draft}
          placeholder={t('placeholder')}
          sendLabel={sending ? t('sending') : t('send')}
          disclaimer={t('disclaimer')}
          suggestion1={t('suggestion_1')}
          suggestion2={t('suggestion_2')}
          showSuggestions={!loading}
          disabled={loading || !conversationId}
          sending={sending}
          images={pendingImages}
          imageUploading={imageUploading}
          imageError={imageError}
          attachImageLabel={t('attach_image')}
          removeImageLabel={t('remove_image')}
          maxImages={maxImages}
          onChange={setDraft}
          onSend={() => void sendMessage(draft)}
          onSuggestion={(text) => void sendMessage(text)}
          onImagePick={(file) => void uploadImage(file)}
          onRemoveImage={removePendingImage}
        />
      </div>
    </div>
  );
};
