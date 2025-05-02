import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import { useUserContext } from '@/src/contexts/UserContext';
import BolsaJugadoresScreen from '@/src/screens/BolsaJugadoresScreen';
import { redirectIfWeb } from '@/src/utils/navigation';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function BolsaJugadoresPage() {
  const { usuario, loading } = useUserContext();

  useEffect(() => {
    if (loading || !usuario) return;

    if (![1, 2, 4].includes(usuario.rol_id)) {
      router.push('/');
    }
  });

  const redirect = redirectIfWeb('/(drawer)/bolsaJugadores');
  if (redirect) return redirect;

  if (loading) {
    return <StyledActivityIndicator />;
  }

  return (
    <PageContainer>
      <HeaderConfig title='Bolsa de Jugadores' backLabel='Más' />
      <BolsaJugadoresScreen />
    </PageContainer>
  );
}
