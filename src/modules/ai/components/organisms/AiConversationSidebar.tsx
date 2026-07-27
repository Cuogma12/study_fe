'use client';

import { Button, MaterialIcon, Text } from '@/shared/components/atoms';
import { AiConversationListItem } from '../../types/ai';

interface AiConversationSidebarProps {
  items: AiConversationListItem[];
  activeConversationId: string | null;
  loading: boolean;
  error: string | null;
  title: string;
  newChatLabel: string;
  loadingLabel: string;
  emptyLabel: string;
  untitledLabel: string;
  messageCountLabel: (count: number) => string;
  onNewChat: () => void;
  onSelect: (item: AiConversationListItem) => void;
}

export const AiConversationSidebar = ({
  items,
  activeConversationId,
  loading,
  error,
  title,
  newChatLabel,
  loadingLabel,
  emptyLabel,
  untitledLabel,
  messageCountLabel,
  onNewChat,
  onSelect,
}: AiConversationSidebarProps) => {
  return (
    <aside className="flex h-auto max-h-48 w-full shrink-0 flex-col border-b border-slate-200 bg-white md:h-full md:max-h-none md:w-72 md:border-b-0 md:border-r dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-3 dark:border-slate-700">
        <Text variant="body2" weight="bold" className="min-w-0 flex-1 !leading-snug">
          {title}
        </Text>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onNewChat}
          className="!inline-flex !h-8 !shrink-0 !items-center !justify-center !gap-1 !px-2.5"
        >
          <MaterialIcon icon="add" size={16} className="!leading-none !text-[16px]" />
          <Text as="span" variant="small" className="!font-semibold !leading-none !text-inherit">
            {newChatLabel}
          </Text>
        </Button>
      </div>

      <div className="scrollbar-nice min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {loading && items.length === 0 ? (
          <Text variant="small" className="px-2 py-3 !text-slate-500">
            {loadingLabel}
          </Text>
        ) : null}

        {!loading && items.length === 0 && !error ? (
          <div className="flex flex-col items-center gap-2 px-3 py-6 text-center md:py-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <MaterialIcon icon="chat_bubble_outline" size={20} className="!text-[20px]" />
            </div>
            <Text variant="small" className="!text-slate-500">
              {emptyLabel}
            </Text>
          </div>
        ) : null}

        {error ? (
          <Text variant="small" className="px-2 py-2 !text-rose-500">
            {error}
          </Text>
        ) : null}

        {items.map((item) => {
          const selected = item.id === activeConversationId;
          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              onClick={() => onSelect(item)}
              className={`!h-auto !w-full !justify-start !gap-2 !rounded-lg !px-3 !py-2 !text-left ${
                selected ? '!bg-primary/10 !text-primary' : '!text-slate-600 hover:!bg-slate-100'
              }`}
            >
              <MaterialIcon
                icon={item.question_id ? 'forum' : 'chat_bubble_outline'}
                size={18}
                className="shrink-0 !text-[18px]"
              />
              <div className="min-w-0">
                <Text
                  as="span"
                  variant="small"
                  weight="semibold"
                  className="block truncate !text-inherit"
                >
                  {item.title || item.question_title || untitledLabel}
                </Text>
                <Text
                  as="span"
                  variant="caption"
                  className="block !normal-case !tracking-normal !text-slate-400"
                >
                  {messageCountLabel(item.message_count)}
                </Text>
              </div>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
