import { useCallback, useEffect, useState } from 'react';
import { questionService } from '../services/question.service';
import { QuestionListItem } from '../types/question';

export interface HomeFeedFilters {
  subjectId?: string | null;
  gradeLevel?: number | null;
}

export const useHomeFeed = (filters: HomeFeedFilters) => {
  const [questions, setQuestions] = useState<QuestionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await questionService.getQuestions({
        page: 1,
        limit: 20,
        sort: 'newest',
        ...(filters.subjectId ? { subject_id: filters.subjectId } : {}),
        ...(filters.gradeLevel ? { grade_level: filters.gradeLevel } : {}),
      });
      setQuestions(data.items);
    } catch {
      setError('load_error');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [filters.gradeLevel, filters.subjectId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const removeQuestion = useCallback((questionId: string) => {
    setQuestions((current) => current.filter((item) => item.id !== questionId));
  }, []);

  return { questions, loading, error, refetch: fetchQuestions, removeQuestion };
};
