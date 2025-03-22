import WebBackHeader from '../../../src/components/navigation/WebBackHeader';
import UserPanelScreen from '../../../src/screens/admin/UserPanelScreen';
export default function UserPanel() {
  return (
    <>
      <WebBackHeader title={'Panel de Usuarios'} onBack="/" />
      <UserPanelScreen />
    </>
  );
}
