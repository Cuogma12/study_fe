'use client';

import { MaterialIcon, Text, Image } from '@/shared/components/atoms';
import { AiMessage } from '../../types/ai';
import { AiMarkdownContent } from '../molecules/AiMarkdownContent';

interface AiChatMessageListProps {
  messages: AiMessage[];
  welcomeTitle: string;
  welcomeText: string;
  thinkingLabel: string;
  isThinking: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  /** compact = sidebar màn detail */
  variant?: 'full' | 'compact';
}

export const AiChatMessageList = ({
  messages,
  welcomeTitle,
  welcomeText,
  thinkingLabel,
  isThinking,
  bottomRef,
  variant = 'full',
}: AiChatMessageListProps) => {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`scrollbar-nice flex-1 space-y-4 overflow-y-auto ${
        isCompact ? 'bg-white p-3' : 'space-y-8 bg-[#f6f6f8] p-4 md:p-6'
      }`}
    >
      {isCompact ? (
        <div className="flex gap-2">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MaterialIcon icon="auto_awesome" size={16} className="!text-[16px]" />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-slate-100 p-3 dark:bg-slate-800">
            <Text variant="body2" weight="semibold" className="!mb-1">
              {welcomeTitle}
            </Text>
            <Text variant="small" className="!text-slate-600 dark:!text-slate-300">
              {welcomeText}
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <MaterialIcon icon="auto_awesome" size={32} className="!text-[32px]" />
          </div>
          <div>
            <Text as="h2" variant="h3" className="!mb-1 !text-xl !font-semibold">
              {welcomeTitle}
            </Text>
            <Text variant="body2" className="mx-auto max-w-md !text-slate-600">
              {welcomeText}
            </Text>
          </div>
        </div>
      )}

      {messages.map((message) => {
        const isUser = message.role === 'user';
        return (
          <div
            key={message.id}
            className={`flex gap-2 ${isUser ? 'ml-auto max-w-full justify-end' : 'max-w-[90%]'}`}
          >
            {!isUser ? (
              <div
                className={`mt-1 flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ${
                  isCompact ? 'h-7 w-7' : 'h-8 w-8'
                }`}
              >
                <MaterialIcon
                  icon="auto_awesome"
                  size={isCompact ? 14 : 18}
                  className={isCompact ? '!text-[14px]' : '!text-[18px]'}
                />
              </div>
            ) : null}
            <div
              className={`rounded-2xl leading-relaxed shadow-[0_1px_3px_rgba(15,23,42,0.08)] ${
                isCompact ? 'p-2.5' : 'p-4'
              } ${
                isUser
                  ? 'max-w-[90%] rounded-tr-sm bg-primary text-white'
                  : 'rounded-tl-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              {(message.images ?? []).length > 0 ? (
                <div
                  className={`mb-2 grid gap-2 ${
                    (message.images ?? []).length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {(message.images ?? []).map((url, index) => (
                    <div key={`${url}-${index}`} className="overflow-hidden rounded-lg">
                      <Image
                        src={url}
                        alt=""
                        className={`w-full object-cover ${isCompact ? 'max-h-32' : 'max-h-64'}`}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              {isUser ? (
                <Text
                  variant={isCompact ? 'small' : 'body1'}
                  className={`whitespace-pre-wrap !text-white ${isCompact ? '' : '!text-base'}`}
                >
                  {message.content}
                </Text>
              ) : (
                <AiMarkdownContent content={message.content} tone="assistant" compact={isCompact} />
              )}
            </div>
          </div>
        );
      })}

      {isThinking ? (
        <div className="flex max-w-[90%] gap-2">
          <div
            className={`mt-1 flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ${
              isCompact ? 'h-7 w-7' : 'h-8 w-8'
            }`}
          >
            <MaterialIcon icon="auto_awesome" size={isCompact ? 14 : 18} />
          </div>
          <div
            className={`rounded-2xl rounded-tl-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 ${
              isCompact ? 'px-3 py-2' : 'px-4 py-3'
            }`}
          >
            <Text variant="small" className="!text-slate-500">
              {thinkingLabel}
            </Text>
          </div>
        </div>
      ) : null}

      <div
        ref={bottomRef as React.RefObject<HTMLDivElement>}
        className={isCompact ? 'h-1' : 'h-4'}
      />
    </div>
  );
};
