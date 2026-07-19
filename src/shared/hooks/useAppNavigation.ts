import { useRouter } from 'next/navigation';

export const useAppNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const replaceTo = (path: string) => {
    router.replace(path);
  };

  return { navigateTo, replaceTo };
};
