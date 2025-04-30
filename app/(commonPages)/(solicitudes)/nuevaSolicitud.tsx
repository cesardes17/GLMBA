import StyledText from '@/src/components/common/StyledText';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import NuevaSolicitudScreen from '@/src/screens/solicitudes/NuevaSolicitudScreen';

export default function NuevaSolicitudPage() {
  return (
    <PageContainer>
      <HeaderConfig title='Nueva Solicitud' backLabel='Solicitudes' />
      <NuevaSolicitudScreen />
    </PageContainer>
  );
}
