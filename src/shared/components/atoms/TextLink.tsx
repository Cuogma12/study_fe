import React, { ButtonHTMLAttributes } from 'react';

export interface TextLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const TextLink = React.forwardRef<HTMLButtonElement, TextLinkProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`m-0 inline-flex cursor-pointer items-center border-none bg-transparent p-0 font-bold text-primary transition-colors hover:text-indigo-600 hover:underline focus:outline-none dark:hover:text-indigo-400 ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TextLink.displayName = 'TextLink';
