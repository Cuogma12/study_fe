import React from 'react';

export interface MaterialIconProps {
  icon: string;
  type?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
  size?: number | string;
  className?: string;
}

export const MaterialIcon = ({
  icon,
  type = 'outlined',
  size = 24,
  className = '',
}: MaterialIconProps) => {
  const baseClass = type === 'outlined' ? 'material-symbols-outlined' : 'material-icons';
  const sizeClass = typeof size === 'string' ? size : '';
  const pixelSize = typeof size === 'number' ? size : undefined;
  const inlineStyle = pixelSize
    ? {
        fontSize: `${pixelSize}px`,
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        lineHeight: 1,
      }
    : { lineHeight: 1 };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center leading-none ${baseClass} ${sizeClass} ${className}`.trim()}
      style={inlineStyle}
      aria-hidden
    >
      {icon}
    </span>
  );
};
