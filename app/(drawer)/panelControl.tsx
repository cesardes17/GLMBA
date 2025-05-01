import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import PageContainer from '@/src/components/PageContainer';
import { useUserContext } from '@/src/contexts/UserContext';
import PanelControlScreen from '@/src/screens/admin/PanelControlScreen';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function PanelControlPage() {
  const { usuario, loading } = useUserContext();

  useEffect(() => {
    if (loading) return;

    if (!usuario) {
      return router.replace('/sinPermisos');
    }
  }, [loading, usuario]);

  if (loading) {
    return (
      <PageContainer>
        <StyledActivityIndicator />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PanelControlScreen />
    </PageContainer>
  );
}
