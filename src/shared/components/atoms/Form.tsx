import React, { FormHTMLAttributes } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`w-full ${className}`.trim()}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';
