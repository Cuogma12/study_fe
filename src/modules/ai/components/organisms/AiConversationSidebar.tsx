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
    <aside className="flex h-44 w-full shrink-0 flex-col border-b border-slate-200 bg-white md:h-full md:w-72 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 p-3">
        <Text variant="body2" weight="bold">
          {title}
        </Text>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onNewChat}
          className="!h-8 !gap-1 !px-2"
        >
          <MaterialIcon icon="add" size={16} className="!text-[16px]" />
          <Text as="span" variant="small" className="!font-semibold !text-inherit">
            {newChatLabel}
          </Text>
        </Button>
      </div>

      <div className="scrollbar-nice flex-1 space-y-1 overflow-y-auto p-2">
        {loading && items.length === 0 ? (
          <Text variant="small" className="px-2 py-3 !text-slate-500">
            {loadingLabel}
          </Text>
        ) : null}

        {!loading && items.length === 0 && !error ? (
          <Text variant="small" className="px-2 py-3 !text-slate-500">
            {emptyLabel}
          </Text>
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
