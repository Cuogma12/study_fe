import { useRouter } from 'next/navigation';
import { buildLoginPath, buildRegisterPath, getCurrentReturnPath } from '@/shared/utils/authRedirect';

export const useAppNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const replaceTo = (path: string) => {
    router.replace(path);
  };

  /** Sang trang login; mặc định nhớ màn hiện tại để quay lại sau khi đăng nhập. */
  const navigateToLogin = (returnTo?: string | null) => {
    navigateTo(buildLoginPath(returnTo ?? getCurrentReturnPath()));
  };

  const navigateToRegister = (returnTo?: string | null) => {
    navigateTo(buildRegisterPath(returnTo ?? getCurrentReturnPath()));
  };

  return { navigateTo, replaceTo, navigateToLogin, navigateToRegister };
};
