import React from 'react';
import { Label } from '../atoms/Label';
import { Text } from '../atoms/Text';

export interface RadioCardOptionProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const RadioCardOption = ({
  name,
  value,
  label,
  checked,
  onChange,
}: RadioCardOptionProps) => (
  <Label className="!mb-0 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 font-normal dark:border-slate-700">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="accent-primary"
    />
    <Text as="span" variant="body2" className="!font-normal !text-inherit">
      {label}
    </Text>
  </Label>
);
