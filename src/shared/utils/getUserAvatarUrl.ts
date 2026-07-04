export const getUserAvatarUrl = (
  avatarUrl: string | null | undefined,
  displayName: string
): string => {
  if (avatarUrl?.trim()) {
    return avatarUrl.trim();
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4848e5&color=fff&size=128`;
};
