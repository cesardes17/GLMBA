import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import AjustesScreen from '@/src/screens/AjustesScreen';

export default function Ajustes() {
  return (
    <PageContainer>
      <HeaderConfig title='Ajustes' backLabel='Más' />
      <AjustesScreen />
    </PageContainer>
  );
}
