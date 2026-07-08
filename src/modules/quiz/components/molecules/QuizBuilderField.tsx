import { Select, Text } from '@/shared/components/atoms';
import { DropdownOption } from '@/shared/components/atoms/Select';

interface QuizBuilderFieldProps {
  label: string;
  value: string | number;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const QuizBuilderField = ({
  label,
  value,
  options,
  placeholder,
  disabled = false,
  onChange,
}: QuizBuilderFieldProps) => {
  return (
    <div>
      <Text variant="small" className="mb-2 !font-semibold !text-slate-600">
        {label}
      </Text>
      <Select
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
