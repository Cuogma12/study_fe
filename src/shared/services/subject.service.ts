import axiosClient from '@/shared/utils/axiosClient';

export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon_url: string;
  description: string;
}

export const subjectService = {
  getSubjects: async (): Promise<Subject[]> => {
    const res = await axiosClient.get('/subjects');
    return res.data;
  }
};
