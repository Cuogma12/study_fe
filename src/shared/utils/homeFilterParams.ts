export type QuestionSort = 'newest' | 'most_viewed' | 'most_answered';
export type QuestionStatusFilter = 'open' | 'closed' | null;

export interface HomeFilters {
  q: string;
  gradeLevel: number | null;
  subjectId: string | null;
  topicId: string | null;
  status: QuestionStatusFilter;
  sort: QuestionSort;
}

export const DEFAULT_HOME_FILTERS: HomeFilters = {
  q: '',
  gradeLevel: null,
  subjectId: null,
  topicId: null,
  status: null,
  sort: 'newest',
};

const VALID_SORTS: QuestionSort[] = ['newest', 'most_viewed', 'most_answered'];
const VALID_GRADES = new Set([10, 11, 12]);

const isQuestionSort = (value: string): value is QuestionSort =>
  VALID_SORTS.includes(value as QuestionSort);

const isQuestionStatus = (value: string): value is 'open' | 'closed' =>
  value === 'open' || value === 'closed';

export const parseHomeFilters = (searchParams: URLSearchParams): HomeFilters => {
  const q = searchParams.get('q')?.trim() ?? '';

  const gradeRaw = searchParams.get('grade');
  const gradeParsed = gradeRaw ? Number(gradeRaw) : NaN;
  const gradeLevel = VALID_GRADES.has(gradeParsed) ? gradeParsed : null;

  const subjectId = searchParams.get('subject') || null;
  const topicId = searchParams.get('topic') || null;

  const statusRaw = searchParams.get('status');
  const status = statusRaw && isQuestionStatus(statusRaw) ? statusRaw : null;

  const sortRaw = searchParams.get('sort');
  const sort = sortRaw && isQuestionSort(sortRaw) ? sortRaw : 'newest';

  return { q, gradeLevel, subjectId, topicId, status, sort };
};

export const buildHomeFilterQuery = (filters: HomeFilters): string => {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set('q', filters.q);
  }
  if (filters.gradeLevel) {
    params.set('grade', String(filters.gradeLevel));
  }
  if (filters.subjectId) {
    params.set('subject', filters.subjectId);
  }
  if (filters.topicId) {
    params.set('topic', filters.topicId);
  }
  if (filters.status) {
    params.set('status', filters.status);
  }
  if (filters.sort !== 'newest') {
    params.set('sort', filters.sort);
  }

  return params.toString();
};

export const mergeHomeFilters = (
  current: HomeFilters,
  partial: Partial<HomeFilters>
): HomeFilters => ({
  ...current,
  ...partial,
});

export const countAdvancedFilters = (filters: HomeFilters): number => {
  let count = 0;
  if (filters.topicId) {
    count += 1;
  }
  if (filters.status) {
    count += 1;
  }
  return count;
};
