export const formatAdminStatNumber = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) {
    return '—';
  }
  return new Intl.NumberFormat('vi-VN').format(value);
};

export const formatAdminScore = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) {
    return '—';
  }
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

export const formatAdminDateTime = (value: string | null | undefined): string => {
  if (!value) {
    return '—';
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const formatAdminLearnerName = (
  fullName: string | null | undefined,
  username: string | null | undefined,
  email: string | null | undefined
): string => fullName?.trim() || username?.trim() || email?.trim() || '—';
