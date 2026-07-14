'use client';

import { MaterialIcon, Text } from '@/shared/components/atoms';

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
  onChange: (value: string) => void;
  onSend: () => void;
  onSuggestion: (text: string) => void;
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
  onChange,
  onSend,
  onSuggestion,
}: AiChatComposerProps) => {
  const isCompact = variant === 'compact';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!disabled && !sending && value.trim()) {
        onSend();
      }
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
          <button
            type="button"
            disabled={disabled || sending}
            onClick={() => onSuggestion(suggestion1)}
            className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 ${
              isCompact ? 'px-2.5 py-1 text-[11px]' : 'px-4 py-2 text-xs shadow-sm'
            }`}
          >
            <MaterialIcon icon="menu_book" size={14} className="!text-[14px]" />
            {suggestion1}
          </button>
          <button
            type="button"
            disabled={disabled || sending}
            onClick={() => onSuggestion(suggestion2)}
            className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 ${
              isCompact ? 'px-2.5 py-1 text-[11px]' : 'px-4 py-2 text-xs shadow-sm'
            }`}
          >
            <MaterialIcon icon="lightbulb" size={14} className="!text-[14px]" />
            {suggestion2}
          </button>
        </div>
      ) : null}

      <div
        className={`flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary dark:border-slate-700 dark:bg-slate-800 ${
          isCompact ? 'p-1.5' : 'p-2 shadow-sm'
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || sending}
          placeholder={placeholder}
          rows={1}
          className={`flex-1 resize-none border-none bg-transparent outline-none placeholder:text-slate-400 disabled:opacity-60 ${
            isCompact
              ? 'max-h-[80px] min-h-[36px] px-2 py-2 text-sm'
              : 'max-h-[120px] min-h-[44px] px-2 py-3 text-base'
          }`}
        />
        <button
          type="button"
          aria-label={sendLabel}
          disabled={disabled || sending || !value.trim()}
          onClick={onSend}
          className={`flex shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${
            isCompact ? 'mb-0.5 h-8 w-8' : 'mb-1 h-10 w-10'
          }`}
        >
          <MaterialIcon
            icon="send"
            size={isCompact ? 16 : 20}
            className={isCompact ? '!text-[16px]' : '!text-[20px]'}
          />
        </button>
      </div>

      <Text
        variant="caption"
        className="mt-2 block text-center !normal-case !tracking-normal !text-slate-400"
      >
        {disclaimer}
      </Text>
    </div>
  );
};
