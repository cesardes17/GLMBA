import PageContainer from "../../src/components/common/PageContainer";
import SetupProfileScreen from "../../src/screens/auth/SetupProfileScreen";

export default function SetupProfile() {
  return (
    <PageContainer title="Completar Perfil" backTitle="Inicio">
      <SetupProfileScreen />
    </PageContainer>
  );
}
