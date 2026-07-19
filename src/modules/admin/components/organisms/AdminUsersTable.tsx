'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Image, Tag } from '@/shared/components/atoms';
import { CommonDataTable } from '@/shared/components/organisms/CommonDataTable';
import { AdminUserItem, AdminUserStatus } from '../../types/user-management';

interface AdminUsersTableProps {
  items: AdminUserItem[];
  loading: boolean;
  currentUserId: string | null;
  updatingId: string | null;
  onUpdateStatus: (userId: string, status: AdminUserStatus) => void;
  onEdit: (user: AdminUserItem) => void;
}

const badgeByStatus: Record<AdminUserStatus, { text: string; className: string }> = {
  active: {
    text: 'active',
    className: 'bg-emerald-100 text-emerald-700',
  },
  inactive: {
    text: 'inactive',
    className: 'bg-slate-200 text-slate-700',
  },
  banned: {
    text: 'banned',
    className: 'bg-red-100 text-red-700',
  },
  pending: {
    text: 'pending',
    className: 'bg-amber-100 text-amber-700',
  },
};

export const AdminUsersTable = ({
  items,
  loading,
  currentUserId,
  updatingId,
  onUpdateStatus,
  onEdit,
}: AdminUsersTableProps) => {
  const t = useTranslations('admin.users');

  const renderAvatar = (user: AdminUserItem) => {
    const fallback = (user.full_name || user.username || user.email || '?')
      .trim()
      .charAt(0)
      .toUpperCase();

    if (user.avatar_url) {
      return (
        <Image
          src={user.avatar_url}
          alt=""
          className="h-9 w-9 rounded-full border border-slate-200 object-cover"
        />
      );
    }

    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600">
        {fallback}
      </div>
    );
  };

  const columns = [
    { key: 'user', label: t('table.user'), className: 'w-[240px]' },
    { key: 'full_name', label: t('table.full_name'), className: 'w-[160px]' },
    { key: 'role', label: t('table.role'), className: 'w-[130px]' },
    { key: 'status', label: t('table.status'), className: 'w-[130px]' },
    { key: 'joined_at', label: t('table.joined_at'), className: 'w-[120px]' },
    { key: 'actions', label: t('table.actions'), className: 'w-[220px] text-right' },
  ];

  const tableRows =
    items.length > 0
      ? items.map((user) => {
          const joinedAt = new Intl.DateTimeFormat('vi-VN', {
            dateStyle: 'short',
          }).format(new Date(user.created_at));
          const statusBadge = badgeByStatus[user.status];
          const isSelf = currentUserId === user.id;
          const canBan = user.status !== 'banned' && !isSelf;
          const canActivate = user.status !== 'active' && !isSelf;
          const isUpdating = updatingId === user.id;

          return (
            <tr key={user.id} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  {renderAvatar(user)}
                  <div className="min-w-0">
                    <div className="truncate font-medium" title={user.email}>
                      {user.email}
                    </div>
                    <div className="truncate text-xs text-slate-500" title={user.username}>
                      @{user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{user.full_name ?? '—'}</td>
              <td className="px-4 py-3 text-sm">
                <Tag className="!rounded !bg-slate-100 !px-2 !py-1 !text-xs !font-semibold !normal-case !text-slate-700">
                  {t(`roles.${user.role}`)}
                </Tag>
              </td>
              <td className="px-4 py-3 text-sm">
                <Tag
                  className={`!rounded !px-2 !py-1 !text-xs !font-semibold !normal-case ${statusBadge.className}`}
                >
                  {t(`status.${statusBadge.text}`)}
                </Tag>
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{joinedAt}</td>
              <td className="px-4 py-3 text-right text-sm">
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => onEdit(user)}
                  >
                    {t('actions.edit')}
                  </Button>
                  {canBan ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onUpdateStatus(user.id, 'banned')}
                    >
                      {t('actions.ban')}
                    </Button>
                  ) : null}
                  {canActivate ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onUpdateStatus(user.id, 'active')}
                    >
                      {t('actions.activate')}
                    </Button>
                  ) : null}
                  {isSelf ? (
                    <span className="text-xs text-slate-500">{t('actions.self_protected')}</span>
                  ) : null}
                </div>
              </td>
            </tr>
          );
        })
      : null;

  return (
    <CommonDataTable
      columns={columns}
      loading={loading}
      loadingLabel={t('loading')}
      emptyLabel={t('empty')}
      rows={tableRows}
    />
  );
};
