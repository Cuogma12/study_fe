import React, { ButtonHTMLAttributes } from 'react';

export interface TextLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const TextLink = React.forwardRef<HTMLButtonElement, TextLinkProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`font-bold text-primary hover:underline focus:outline-none bg-transparent p-0 m-0 border-none cursor-pointer inline-flex items-center ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TextLink.displayName = 'TextLink';
