import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import PageContainer from '@/src/components/PageContainer';
import AjustesScreen from '@/src/screens/AjustesScreen';
import { redirectIfWeb } from '@/src/utils/navigation';

export default function Ajustes() {
  const redirect = redirectIfWeb('/(drawer)/ajustes');
  if (redirect) return redirect;

  return (
    <PageContainer>
      <HeaderConfig title='Ajustes' backLabel='Más' />
      <AjustesScreen />
    </PageContainer>
  );
}
