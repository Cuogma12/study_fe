export const formatLoginDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { date: value, time: '' };
  }

  return {
    date: new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short' }).format(date),
    time: new Intl.DateTimeFormat('vi-VN', { timeStyle: 'medium' }).format(date),
  };
};

export const formatDeviceLabel = (
  userAgent: string | null,
  deviceInfo: string | null
): { label: string; full: string | null } => {
  const full = userAgent ?? deviceInfo;
  if (!full) {
    return { label: '-', full: null };
  }

  let browser = 'Browser';
  if (/Edg\//.test(full)) browser = 'Edge';
  else if (/Chrome\//.test(full)) browser = 'Chrome';
  else if (/Firefox\//.test(full)) browser = 'Firefox';
  else if (/Safari\//.test(full) && !/Chrome/.test(full)) browser = 'Safari';

  let os = 'Unknown';
  if (/Windows/.test(full)) os = 'Windows';
  else if (/Mac OS X/.test(full)) os = 'macOS';
  else if (/Android/.test(full)) os = 'Android';
  else if (/iPhone|iPad/.test(full)) os = 'iOS';
  else if (/Linux/.test(full)) os = 'Linux';

  return {
    label: `${browser} · ${os}`,
    full: userAgent ?? deviceInfo,
  };
};
