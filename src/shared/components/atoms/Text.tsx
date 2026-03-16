import React, { ElementType, HTMLAttributes } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'small' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as, variant = 'body1', weight, className = '', children, ...props }, ref) => {
    const defaultTags: Record<string, ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body1: 'p',
      body2: 'p',
      small: 'span',
      caption: 'span',
    };

    const Component = as || defaultTags[variant] || 'p';
    
    const variants = {
      h1: 'text-4xl tracking-tight',
      h2: 'text-3xl tracking-tight',
      h3: 'text-2xl tracking-tight',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
      body1: 'text-base leading-relaxed',
      body2: 'text-sm',
      small: 'text-xs',
      caption: 'text-[10px] uppercase tracking-wider',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    };

    const defaultWeights: Record<string, keyof typeof weights> = {
      h1: 'extrabold',
      h2: 'bold',
      h3: 'bold',
      h4: 'semibold',
      h5: 'semibold',
      h6: 'medium',
      body1: 'normal',
      body2: 'normal',
      small: 'normal',
      caption: 'bold',
    };

    const appliedWeight = weight || defaultWeights[variant] || 'normal';

    const combinedClassName = `${variants[variant]} ${weights[appliedWeight]} text-slate-900 dark:text-slate-100 ${className}`.trim();

    return (
      <Component ref={ref as any} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
