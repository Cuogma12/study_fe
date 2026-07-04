export type CloudinaryFolder = 'avatars' | 'posts';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
}

const getConfig = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('cloudinary_not_configured');
  }

  return { cloudName, uploadPreset };
};

/** Upload ảnh lên Cloudinary (unsigned preset), trả URL https. */
export const uploadToCloudinary = async (
  file: File,
  folder: CloudinaryFolder = 'avatars'
): Promise<string> => {
  const { cloudName, uploadPreset } = getConfig();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', `study_ai/${folder}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('cloudinary_upload_failed');
  }

  const data = (await response.json()) as CloudinaryUploadResponse;
  if (!data.secure_url) {
    throw new Error('cloudinary_upload_failed');
  }

  return data.secure_url;
};

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
};
