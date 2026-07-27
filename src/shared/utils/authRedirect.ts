/** Chỉ cho phép path nội bộ tương đối — tránh open redirect. */
export const getSafeAuthRedirect = (raw: string | null | undefined): string | null => {
  if (!raw) {
    return null;
  }

  let value = raw;
  try {
    value = decodeURIComponent(raw);
  } catch {
    return null;
  }

  if (!value.startsWith('/') || value.startsWith('//') || value.includes('://')) {
    return null;
  }

  const pathOnly = value.split('?')[0] ?? value;
  const isAuthPage =
    pathOnly === '/login' ||
    pathOnly === '/register' ||
    /^\/[a-z]{2}\/login$/.test(pathOnly) ||
    /^\/[a-z]{2}\/register$/.test(pathOnly);

  if (isAuthPage) {
    return null;
  }

  return value;
};

export const buildLoginPath = (returnTo?: string | null): string => {
  const safe = getSafeAuthRedirect(returnTo);
  if (!safe) {
    return '/login';
  }
  return `/login?redirect=${encodeURIComponent(safe)}`;
};

export const buildRegisterPath = (returnTo?: string | null): string => {
  const safe = getSafeAuthRedirect(returnTo);
  if (!safe) {
    return '/register';
  }
  return `/register?redirect=${encodeURIComponent(safe)}`;
};

export const getCurrentReturnPath = (): string | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return `${window.location.pathname}${window.location.search}`;
};
