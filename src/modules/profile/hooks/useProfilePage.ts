'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { resolveApiErrorMessage } from '@/shared/utils/resolveApiErrorMessage';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  profileService,
  SavedQuestionItem,
  UpdateProfilePayload,
} from '../services/profile.service';
import { UserProfile } from '../types/profile';
import { QuestionListItem } from '@/modules/home/types/question';
import { quizService } from '@/modules/quiz/services/quiz.service';

export type ProfileTab = 'mine' | 'saved';

export const useProfilePage = () => {
  const { ready, isAuthenticated, userId } = useAuth();
  const t = useTranslations('profile');
  const tApiErrors = useTranslations('api_errors');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myQuestions, setMyQuestions] = useState<QuestionListItem[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionItem[]>([]);
  const [quizStats, setQuizStats] = useState<{ doneCount: number; avgScore: number | null }>({
    doneCount: 0,
    avgScore: null,
  });
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [tab, setTab] = useState<ProfileTab>('mine');
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getById(userId);
      setProfile(data);
    } catch {
      setProfile(null);
      setError('load_error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchLists = useCallback(async () => {
    if (!userId) {
      return;
    }

    setListLoading(true);
    try {
      const [mine, saved, quizRes] = await Promise.all([
        profileService.getMyQuestions(userId),
        profileService.getSavedQuestions(),
        quizService.getMyAttempts({ page: 1, limit: 50, status: 'submitted' }),
      ]);
      setMyQuestions(mine);
      setSavedQuestions(saved);

      const scores = quizRes.items
        .map((item) => item.score)
        .filter((score): score is number => typeof score === 'number' && !Number.isNaN(score));
      const avg =
        scores.length > 0
          ? Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10
          : null;

      setQuizStats({
        doneCount: quizRes.pagination?.total ?? quizRes.items.length,
        avgScore: avg,
      });
    } catch {
      setMyQuestions([]);
      setSavedQuestions([]);
      setQuizStats({ doneCount: 0, avgScore: null });
    } finally {
      setListLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      setProfile(null);
      return;
    }
    fetchProfile();
    fetchLists();
  }, [ready, isAuthenticated, fetchProfile, fetchLists]);

  const updateProfile = async (payload: UpdateProfilePayload) => {
    if (!userId) {
      return;
    }

    setSaving(true);
    setEditError(null);
    try {
      const updated = await profileService.update(userId, payload);
      setProfile(updated);
      setEditOpen(false);
    } catch (err: unknown) {
      setEditError(resolveApiErrorMessage(err, tApiErrors, t('update_failed')));
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const changeAvatar = async (imageUrl: string) => {
    if (!userId) {
      return;
    }

    setAvatarUploading(true);
    try {
      const updated = await profileService.update(userId, { avatar_url: imageUrl });
      setProfile(updated);
    } finally {
      setAvatarUploading(false);
    }
  };

  const removeMyQuestion = (questionId: string) => {
    setMyQuestions((current) => current.filter((item) => item.id !== questionId));
  };

  return {
    ready,
    isAuthenticated,
    profile,
    myQuestions,
    savedQuestions,
    quizStats,
    loading,
    listLoading,
    tab,
    setTab,
    error,
    editOpen,
    setEditOpen,
    saving,
    avatarUploading,
    editError,
    setEditError,
    updateProfile,
    changeAvatar,
    removeMyQuestion,
  };
};
