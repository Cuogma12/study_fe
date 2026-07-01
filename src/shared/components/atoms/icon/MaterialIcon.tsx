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
  const inlineStyle = typeof size === 'number' ? { fontSize: `${size}px` } : undefined;

  return (
    <span className={`${baseClass} ${sizeClass} ${className}`.trim()} style={inlineStyle}>
      {icon}
    </span>
  );
};
