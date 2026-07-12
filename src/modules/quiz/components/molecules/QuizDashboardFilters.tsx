import { ReactNode } from 'react';
import { Input, Select, Text } from '@/shared/components/atoms';
import { DropdownOption } from '@/shared/components/atoms/Select';
import { useTranslations } from 'next-intl';
import { quizDashboardPanel } from '../../constants/quizDashboardStyles';

interface QuizDashboardFiltersProps {
  keyword: string;
  subjectFilter: string;
  gradeFilter: string;
  setTypeFilter: string;
  subjectOptions: DropdownOption[];
  gradeOptions: DropdownOption[];
  setTypeOptions: DropdownOption[];
  searchPlaceholder: string;
  onKeywordChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onSetTypeChange: (value: string) => void;
}

const FilterField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="min-w-0">
    <Text variant="small" className="mb-1.5 !font-semibold !text-slate-600 dark:!text-slate-400">
      {label}
    </Text>
    {children}
  </div>
);

export const QuizDashboardFilters = ({
  keyword,
  subjectFilter,
  gradeFilter,
  setTypeFilter,
  subjectOptions,
  gradeOptions,
  setTypeOptions,
  searchPlaceholder,
  onKeywordChange,
  onSubjectChange,
  onGradeChange,
  onSetTypeChange,
}: QuizDashboardFiltersProps) => {
  const t = useTranslations('quiz.dashboard.filters');

  return (
    <div className={`${quizDashboardPanel.filters} mt-4 space-y-3`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <FilterField label={t('labels.set_type')}>
          <Select
            value={setTypeFilter}
            options={setTypeOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onSetTypeChange(event.target.value)}
          />
        </FilterField>

        <FilterField label={t('labels.subject')}>
          <Select
            value={subjectFilter}
            options={subjectOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onSubjectChange(event.target.value)}
          />
        </FilterField>

        <FilterField label={t('labels.grade')}>
          <Select
            value={gradeFilter}
            options={gradeOptions}
            className={quizDashboardPanel.selectControl}
            hideErrorMessage
            onChange={(event) => onGradeChange(event.target.value)}
          />
        </FilterField>
      </div>

      <FilterField label={t('labels.search')}>
        <Input
          value={keyword}
          placeholder={searchPlaceholder}
          className={quizDashboardPanel.fieldControl}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
      </FilterField>
    </div>
  );
};
