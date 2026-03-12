import React from 'react';
import { Input, InputProps, Label } from '@/shared/components/atoms';

interface FormFieldProps extends InputProps {
  label?: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <Input ref={ref} id={id} error={error} {...props} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
