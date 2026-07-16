import { ReactNode } from 'react';
import { Input, Select, Text } from '@/shared/components/atoms';
import { DropdownOption } from '@/shared/components/atoms/Select';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizHistoryFiltersProps {
  keyword: string;
  subjectFilter: string;
  gradeFilter: string;
  modeFilter: string;
  subjectOptions: DropdownOption[];
  gradeOptions: DropdownOption[];
  modeOptions: DropdownOption[];
  searchPlaceholder: string;
  subjectLabel: string;
  gradeLabel: string;
  modeLabel: string;
  onKeywordChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onModeChange: (value: string) => void;
}

const FilterField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="min-w-0">
    <Text variant="small" className="mb-1.5 !font-semibold !text-slate-600 dark:!text-slate-400">
      {label}
    </Text>
    {children}
  </div>
);

export const QuizHistoryFilters = ({
  keyword,
  subjectFilter,
  gradeFilter,
  modeFilter,
  subjectOptions,
  gradeOptions,
  modeOptions,
  searchPlaceholder,
  subjectLabel,
  gradeLabel,
  modeLabel,
  onKeywordChange,
  onSubjectChange,
  onGradeChange,
  onModeChange,
}: QuizHistoryFiltersProps) => {
  return (
    <div className={`${quizDashboardPanel.filters} mb-5 space-y-3`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <FilterField label={modeLabel}>
          <Select
            value={modeFilter}
            options={modeOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onModeChange(event.target.value)}
          />
        </FilterField>

        <FilterField label={subjectLabel}>
          <Select
            value={subjectFilter}
            options={subjectOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onSubjectChange(event.target.value)}
          />
        </FilterField>

        <FilterField label={gradeLabel}>
          <Select
            value={gradeFilter}
            options={gradeOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onGradeChange(event.target.value)}
          />
        </FilterField>
      </div>

      <Input
        value={keyword}
        placeholder={searchPlaceholder}
        className={quizDashboardPanel.fieldControl}
        hideErrorMessage
        onChange={(event) => onKeywordChange(event.target.value)}
      />
    </div>
  );
};
