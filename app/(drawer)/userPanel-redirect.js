import { useRouter, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../src/hooks/useAuth';

export default function UserPanelRedirect() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user, userData } = useAuth();

  useEffect(() => {
    // Check if user is logged in and has organizer role
    if (!user) {
      router.replace('/login');
      return;
    }

    if (userData.role !== 'organizador') {
      router.replace('/unauthorized');
      return;
    }

    // If authorized, proceed to user panel
    router.replace('/admin/user-panel');
  }, [router, user]);

  return null; // Return null to avoid any flash of content
}
