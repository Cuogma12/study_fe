import React, { InputHTMLAttributes } from 'react';

export interface HiddenFileInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const HiddenFileInput = React.forwardRef<HTMLInputElement, HiddenFileInputProps>(
  (props, ref) => (
    <input ref={ref} type="file" className="hidden" {...props} />
  )
);

HiddenFileInput.displayName = 'HiddenFileInput';
