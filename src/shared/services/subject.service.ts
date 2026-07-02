import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';

export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  description: string | null;
  created_at?: string;
}

export const subjectService = {
  getSubjects: async (): Promise<Subject[]> => {
    const res = await axiosClient.get(API_ENDPOINTS.SUBJECTS.LIST);
    return res.data.items;
  },
};
