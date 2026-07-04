'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  profileService,
  SavedQuestionItem,
  UpdateProfilePayload,
} from '../services/profile.service';
import { UserProfile } from '../types/profile';
import { QuestionListItem } from '@/modules/home/types/question';

export type ProfileTab = 'mine' | 'saved';

export const useProfilePage = () => {
  const { ready, isAuthenticated, userId } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myQuestions, setMyQuestions] = useState<QuestionListItem[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionItem[]>([]);
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
      const [mine, saved] = await Promise.all([
        profileService.getMyQuestions(userId),
        profileService.getSavedQuestions(),
      ]);
      setMyQuestions(mine);
      setSavedQuestions(saved);
    } catch {
      setMyQuestions([]);
      setSavedQuestions([]);
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
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'update_failed';
      setEditError(message);
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

  return {
    ready,
    isAuthenticated,
    profile,
    myQuestions,
    savedQuestions,
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
  };
};
