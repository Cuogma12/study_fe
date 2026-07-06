export const normalizeQuestionImages = (images: unknown): string[] => {
  if (Array.isArray(images)) {
    return images.filter((url): url is string => typeof url === 'string' && url.trim().length > 0);
  }

  if (typeof images === 'string' && images.trim()) {
    try {
      const parsed = JSON.parse(images) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((url): url is string => typeof url === 'string' && url.trim().length > 0);
      }
    } catch {
      return [];
    }
  }

  return [];
};
