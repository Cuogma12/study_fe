'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './ai-markdown.css';

interface AiMarkdownContentProps {
  content: string;
  /** user bubble = chữ trắng; assistant = chữ tối */
  tone?: 'user' | 'assistant';
  compact?: boolean;
}

export const AiMarkdownContent = ({
  content,
  tone = 'assistant',
  compact = false,
}: AiMarkdownContentProps) => {
  const isUser = tone === 'user';

  return (
    <div
      className={`ai-md max-w-none break-words ${
        compact ? 'text-xs leading-relaxed' : 'text-sm leading-relaxed sm:text-base'
      } ${isUser ? 'ai-md--user text-white' : 'ai-md--assistant text-slate-900 dark:text-slate-100'}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className={isUser ? 'font-bold text-white' : 'font-bold'}>{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          h1: ({ children }) => (
            <h1 className={`mb-2 font-bold ${compact ? 'text-sm' : 'text-lg'}`}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={`mb-2 font-bold ${compact ? 'text-sm' : 'text-base'}`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`mb-2 font-semibold ${compact ? 'text-xs' : 'text-sm'}`}>{children}</h3>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className?.includes('language-'));
            if (isBlock) {
              return (
                <code
                  className={`mb-2 block overflow-x-auto rounded-lg px-3 py-2 font-mono text-[0.85em] ${
                    isUser ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-900'
                  }`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`rounded px-1 py-0.5 font-mono text-[0.9em] ${
                  isUser ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-900'
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="mb-2 overflow-x-auto last:mb-0">{children}</pre>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`underline ${isUser ? 'text-white' : 'text-primary'}`}
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr
              className={`my-3 border-t ${
                isUser ? 'border-white/30' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
          ),
          blockquote: ({ children }) => (
            <blockquote
              className={`mb-2 border-l-2 pl-3 italic last:mb-0 ${
                isUser ? 'border-white/40' : 'border-primary/40 text-slate-600'
              }`}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
