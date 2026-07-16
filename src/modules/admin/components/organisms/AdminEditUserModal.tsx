'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, Select, Text, Textarea } from '@/shared/components/atoms';
import { ModalBackdrop } from '@/shared/components/molecules/ModalBackdrop';
import {
  AdminUserItem,
  AdminUserRole,
  AdminUserStatus,
} from '../../types/user-management';

export interface AdminEditUserFormValues {
  username: string;
  email: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  grade_level: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  new_password: string;
}

interface AdminEditUserModalProps {
  user: AdminUserItem | null;
  saving: boolean;
  canChangeRole: boolean;
  canChangeStatus: boolean;
  roleOptions: { value: AdminUserRole; label: string }[];
  statusOptions: { value: AdminUserStatus; label: string }[];
  onClose: () => void;
  onSave: (values: AdminEditUserFormValues) => Promise<boolean>;
}

export const AdminEditUserModal = ({
  user,
  saving,
  canChangeRole,
  canChangeStatus,
  roleOptions,
  statusOptions,
  onClose,
  onSave,
}: AdminEditUserModalProps) => {
  const t = useTranslations('admin.users');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [role, setRole] = useState<AdminUserRole>('user');
  const [status, setStatus] = useState<AdminUserStatus>('active');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!user) return;
    setUsername(user.username ?? '');
    setEmail(user.email ?? '');
    setFullName(user.full_name ?? '');
    setAvatarUrl(user.avatar_url ?? '');
    setBio(user.bio ?? '');
    setGradeLevel(user.grade_level != null ? String(user.grade_level) : '');
    setRole(user.role);
    setStatus(user.status);
    setNewPassword('');
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ok = await onSave({
      username: username.trim(),
      email: email.trim(),
      full_name: fullName.trim(),
      avatar_url: avatarUrl.trim(),
      bio: bio.trim(),
      grade_level: gradeLevel,
      role,
      status,
      new_password: newPassword,
    });
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <ModalBackdrop onClick={onClose} ariaLabel={t('edit.close')} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <Text variant="h4" className="!mb-1">
          {t('edit.title')}
        </Text>
        <Text variant="body2" className="!mb-4 !text-slate-500">
          {t('edit.subtitle')}
        </Text>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.username')}
            </Text>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={saving}
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.email')}
            </Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saving}
              required
            />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.full_name')}
            </Text>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={saving}
            />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.avatar_url')}
            </Text>
            <Input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              disabled={saving}
              placeholder={t('edit.avatar_url_placeholder')}
            />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.bio')}
            </Text>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={saving}
              rows={3}
            />
          </div>

          <div>
            <Text as="label" variant="small" className="!mb-1 !block !font-medium">
              {t('edit.grade_level')}
            </Text>
            <Select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              disabled={saving}
              options={[
                { value: '', label: t('edit.grade_none') },
                { value: '10', label: t('edit.grade_10') },
                { value: '11', label: t('edit.grade_11') },
                { value: '12', label: t('edit.grade_12') },
              ]}
              className="!py-2.5"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Text as="label" variant="small" className="!mb-1 !block !font-medium">
                {t('edit.role')}
              </Text>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminUserRole)}
                disabled={saving || !canChangeRole}
                options={roleOptions}
                className="!py-2.5"
              />
              {!canChangeRole ? (
                <Text variant="small" className="!mt-1 !block !text-slate-500">
                  {t('edit.role_self_locked')}
                </Text>
              ) : null}
            </div>

            <div>
              <Text as="label" variant="small" className="!mb-1 !block !font-medium">
                {t('edit.status')}
              </Text>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminUserStatus)}
                disabled={saving || !canChangeStatus}
                options={statusOptions}
                className="!py-2.5"
              />
              {!canChangeStatus ? (
                <Text variant="small" className="!mt-1 !block !text-slate-500">
                  {t('edit.status_self_locked')}
                </Text>
              ) : null}
            </div>
          </div>

          {canChangeStatus ? (
            <div>
              <Text as="label" variant="small" className="!mb-1 !block !font-medium">
                {t('edit.new_password')}
              </Text>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={saving}
                autoComplete="new-password"
                placeholder={t('edit.new_password_placeholder')}
              />
              <Text variant="small" className="!mt-1 !block !text-slate-500">
                {t('edit.new_password_hint')}
              </Text>
            </div>
          ) : (
            <Text variant="small" className="!block !text-slate-500">
              {t('edit.password_self_locked')}
            </Text>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={saving} onClick={onClose}>
              {t('edit.cancel')}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? t('edit.saving') : t('edit.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
