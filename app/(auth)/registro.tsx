import PageContainer from "../../src/components/common/PageContainer";
import RegistroScreen from "../../src/screens/auth/RegistroScreen";

export default function Registro() {
  return (
    <PageContainer title="Registro" backTitle="Inicio">
      <RegistroScreen />
    </PageContainer>
  );
}
