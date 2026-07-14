'use client';

import { MaterialIcon, Text } from '@/shared/components/atoms';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { useAiTutorChat } from '../../hooks/useAiTutorChat';
import { AiChatComposer } from './AiChatComposer';
import { AiChatMessageList } from './AiChatMessageList';

interface AiTutorChatProps {
  questionId?: string | null;
}

export const AiTutorChat = ({ questionId }: AiTutorChatProps) => {
  const { navigateTo } = useAppNavigation();
  const {
    t,
    conversationId,
    messages,
    draft,
    setDraft,
    loading,
    sending,
    error,
    bottomRef,
    welcomeText,
    contextBanner,
    sendMessage,
  } = useAiTutorChat({ questionId });

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-[800px] flex-col overflow-hidden bg-[#f6f6f8]">
      <header className="flex shrink-0 items-center border-b border-slate-200 bg-white px-6 py-4">
        <button
          type="button"
          aria-label={t('back')}
          onClick={() => navigateTo('/ai')}
          className="-ml-2 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-primary"
        >
          <MaterialIcon icon="arrow_back" />
        </button>

        <div className="ml-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MaterialIcon icon="auto_awesome" size={20} className="!text-[20px]" />
          </div>
          <div className="flex items-center gap-2">
            <Text as="h1" variant="h3" className="!text-xl !font-semibold">
              {t('title')}
            </Text>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {t('online')}
            </span>
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
        onChange={setDraft}
        onSend={() => void sendMessage(draft)}
        onSuggestion={(text) => void sendMessage(text)}
      />
    </div>
  );
};
