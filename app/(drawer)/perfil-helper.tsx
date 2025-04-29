import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import PerfilScreen from '@/src/screens/user/PerfilScreen';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserContext } from '@/src/contexts/UserContext';
import PageContainer from '@/src/components/PageContainer';

export default function PerfilHelper() {
  const { authUser, authloading, logoutInProgress } = useAuth();
  const { usuario, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (authloading || loading) return;

    if (!authUser) {
      return router.replace('/login');
    }
    if (!usuario) {
      return router.replace('/completar-perfil');
    }
  }, [authUser, authloading, logoutInProgress, router, loading, usuario]);

  if (authloading || loading) {
    return (
      <PageContainer>
        <StyledActivityIndicator />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PerfilScreen />
    </PageContainer>
  );
}
