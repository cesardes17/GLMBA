import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import SolicitudesScreen from '@/src/screens/SolicitudesScreen';

export default function Ajustes() {
  return (
    <PageContainer>
      <HeaderConfig title='Solicitudes' backLabel='Más' />
      <SolicitudesScreen />
    </PageContainer>
  );
}
