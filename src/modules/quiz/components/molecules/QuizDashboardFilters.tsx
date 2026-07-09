import { Input, Select } from '@/shared/components/atoms';
import { DropdownOption } from '@/shared/components/atoms/Select';

interface QuizDashboardFiltersProps {
  keyword: string;
  subjectFilter: string;
  gradeFilter: string;
  subjectOptions: DropdownOption[];
  gradeOptions: DropdownOption[];
  searchPlaceholder: string;
  onKeywordChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onGradeChange: (value: string) => void;
}

export const QuizDashboardFilters = ({
  keyword,
  subjectFilter,
  gradeFilter,
  subjectOptions,
  gradeOptions,
  searchPlaceholder,
  onKeywordChange,
  onSubjectChange,
  onGradeChange,
}: QuizDashboardFiltersProps) => {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
      <Select
        value={subjectFilter}
        options={subjectOptions}
        onChange={(event) => onSubjectChange(event.target.value)}
      />
      <Select
        value={gradeFilter}
        options={gradeOptions}
        onChange={(event) => onGradeChange(event.target.value)}
      />
      <Input
        value={keyword}
        placeholder={searchPlaceholder}
        onChange={(event) => onKeywordChange(event.target.value)}
        className="!py-3"
      />
    </div>
  );
};
