import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const useRegister = () => {
  const router = useRouter();
  const t = useTranslations();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const gradeOptions = [
    { label: t('auth.register.grades.grade_10'), value: '10' },
    { label: t('auth.register.grades.grade_11'), value: '11' },
    { label: t('auth.register.grades.grade_12'), value: '12' },
  ];

  return {
    t,
    handleLoginRedirect,
    gradeOptions,
  };
};
