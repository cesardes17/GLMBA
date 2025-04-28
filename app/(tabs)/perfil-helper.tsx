import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import PageContainer from '@/src/components/PageContainer';
import PerfilScreen from '@/src/screens/user/PerfilScreen';
import { useUserContext } from '@/src/contexts/UserContext';

export default function PerfilHelper() {
  const { authUser, authloading, logoutInProgress } = useAuth();
  const { usuario, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (authloading || loading || logoutInProgress) return;
    console.log('authUser', authUser);
    if (!authUser) {
      return router.replace('/login');
    }
    if (!usuario) {
      return router.replace('/completar-perfil');
    }
  }, [authUser, authloading, logoutInProgress, router, loading, usuario]);

  if (authloading) {
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
