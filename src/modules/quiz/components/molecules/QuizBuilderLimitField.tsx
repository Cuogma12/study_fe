'use client';

import { useEffect, useState } from 'react';
import { Input, MaterialIcon, Select, Text } from '@/shared/components/atoms';
import { DropdownOption } from '@/shared/components/atoms/Select';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizBuilderLimitFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  presetOptions: DropdownOption[];
  customPlaceholder: string;
  hint: string;
  error?: string | null;
  onChange: (value: number) => void;
}

const clampLimit = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const QuizBuilderLimitField = ({
  label,
  value,
  min,
  max,
  disabled = false,
  presetOptions,
  customPlaceholder,
  hint,
  error,
  onChange,
}: QuizBuilderLimitFieldProps) => {
  const [inputValue, setInputValue] = useState(String(value));
  const presetValues = presetOptions.map((option) => Number(option.value));
  const selectValue = presetValues.includes(value) ? String(value) : '';

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleInputChange = (raw: string) => {
    setInputValue(raw);
    const parsed = Number(raw);
    if (!Number.isNaN(parsed) && raw.trim() !== '') {
      onChange(clampLimit(parsed, min, max));
    }
  };

  const handleInputBlur = () => {
    const parsed = Number(inputValue);
    const next = Number.isNaN(parsed) ? value : clampLimit(parsed, min, max);
    setInputValue(String(next));
    onChange(next);
  };

  const handleSelectChange = (raw: string) => {
    if (!raw) {
      return;
    }
    const next = clampLimit(Number(raw), min, max);
    setInputValue(String(next));
    onChange(next);
  };

  return (
    <div>
      <Text variant="small" className="mb-2 !font-semibold !text-slate-600">
        {label}
      </Text>
      <div className="grid gap-2 sm:grid-cols-2">
        <Select
          value={selectValue}
          disabled={disabled}
          placeholder={customPlaceholder}
          options={presetOptions}
          className={quizDashboardPanel.selectControl}
          hideErrorMessage
          onChange={(event) => handleSelectChange(event.target.value)}
        />
        <Input
          type="number"
          min={min}
          max={max}
          value={inputValue}
          disabled={disabled}
          onChange={(event) => handleInputChange(event.target.value)}
          onBlur={handleInputBlur}
          className={quizDashboardPanel.fieldControl}
          hideErrorMessage
        />
      </div>
      {error ? (
        <Text
          as="p"
          variant="small"
          className="mt-2 flex items-center gap-1.5 !text-rose-600 dark:!text-rose-400"
          role="alert"
        >
          <MaterialIcon icon="error_outline" size="text-base" className="!text-inherit" />
          {error}
        </Text>
      ) : null}
      <Text variant="small" className="mt-1.5 !text-slate-500">
        {hint}
      </Text>
    </div>
  );
};
