'use client';

import { useCallback, useEffect, useState } from 'react';
import { questionService } from '../services/question.service';
import { answerService } from '../services/answer.service';
import { QuestionDetail } from '../types/question';
import { AnswerItem } from '../types/answer';

export const useQuestionDetail = (questionId: string) => {
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchQuestion = useCallback(async () => {
    if (!questionId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await questionService.getById(questionId);
      setQuestion(data);
    } catch {
      setError('load_error');
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  }, [questionId]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const toggleSave = async () => {
    if (!question) {
      return;
    }

    setActionLoading(true);
    try {
      const result = await questionService.toggleSave(question.id);
      setQuestion((current) =>
        current ? { ...current, is_saved: result.saved } : current
      );
    } finally {
      setActionLoading(false);
    }
  };

  const closeDiscussion = async () => {
    if (!question) {
      return;
    }

    setActionLoading(true);
    try {
      await questionService.close(question.id);
      setQuestion((current) =>
        current
          ? { ...current, is_closed: true, status: 'closed' }
          : current
      );
    } finally {
      setActionLoading(false);
    }
  };

  const deleteQuestion = async () => {
    if (!question) {
      return;
    }

    setActionLoading(true);
    try {
      await questionService.delete(question.id);
    } catch (error) {
      setActionLoading(false);
      throw error;
    }
    setActionLoading(false);
  };

  const submitAnswer = async (content: string) => {
    if (!question) {
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    setActionLoading(true);
    try {
      const answer = await answerService.createForQuestion(question.id, {
        content: trimmed,
      });
      setQuestion((current) =>
        current
          ? {
              ...current,
              answers: [answer, ...(current.answers ?? [])],
              answers_count: current.answers_count + 1,
            }
          : current
      );
    } finally {
      setActionLoading(false);
    }
  };

  const submitReply = async (parentAnswerId: string, content: string) => {
    if (!question) {
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    setActionLoading(true);
    try {
      const reply = await answerService.createReply({
        target_type: 'answer',
        target_id: parentAnswerId,
        content: trimmed,
      });
      setQuestion((current) =>
        current
          ? { ...current, answers_count: current.answers_count + 1 }
          : current
      );
      return reply;
    } finally {
      setActionLoading(false);
    }
  };

  const loadReplies = async (answerId: string): Promise<AnswerItem[]> => {
    const data = await answerService.listByTarget('answer', answerId);
    return data.items;
  };

  return {
    question,
    loading,
    error,
    actionLoading,
    refetch: fetchQuestion,
    toggleSave,
    closeDiscussion,
    deleteQuestion,
    submitAnswer,
    submitReply,
    loadReplies,
  };
};
