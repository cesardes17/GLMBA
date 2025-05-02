import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import SolicitudesScreen from '@/src/screens/solicitudes/SolicitudesScreen';
import { redirectIfWeb } from '@/src/utils/navigation';

export default function Ajustes() {
  const redirect = redirectIfWeb('/(drawer)/solicitudes');
  if (redirect) return redirect;

  return (
    <PageContainer>
      <HeaderConfig title='Solicitudes' backLabel='Más' />
      <SolicitudesScreen />
    </PageContainer>
  );
}
