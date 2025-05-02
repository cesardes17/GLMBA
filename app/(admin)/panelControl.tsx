import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import { useUserContext } from '@/src/contexts/UserContext';
import PanelControlScreen from '@/src/screens/admin/PanelControlScreen';
import { redirectIfWeb } from '@/src/utils/navigation';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function PanelControlPage() {
  const { usuario, loading } = useUserContext();
  useEffect(() => {
    if (loading) return;

    if (!usuario) {
      return router.replace('/');
    }
  }, [loading, usuario]);

  if (loading) {
    return (
      <PageContainer>
        <StyledActivityIndicator />
      </PageContainer>
    );
  }
  const redirect = redirectIfWeb('/(drawer)/panelControl');
  if (redirect) return redirect;

  return (
    <PageContainer>
      <HeaderConfig title='Panel de Control' backLabel='Más' />
      <PanelControlScreen />
    </PageContainer>
  );
}
