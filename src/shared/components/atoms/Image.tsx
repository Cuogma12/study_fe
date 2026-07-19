import React, { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt = '', className = '', loading = 'lazy', ...props }, ref) => {
    return <img ref={ref} src={src} alt={alt} loading={loading} className={className} {...props} />;
  }
);

Image.displayName = 'Image';
