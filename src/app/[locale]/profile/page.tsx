import { ProfilePage } from '@/modules/profile/pages/ProfilePage';
import { AppShell } from '@/shared/components/organisms/AppShell';

export default function ProfileRoute() {
  return (
    <AppShell>
      <ProfilePage />
    </AppShell>
  );
}
