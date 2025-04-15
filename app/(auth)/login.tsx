import PageContainer from "../../src/components/common/PageContainer";
import LoginScreen from "../../src/screens/auth/LoginScreen";

export default function Login() {
  return (
    <PageContainer title="Inicio de Sesión" backTitle="Inicio">
      <LoginScreen />
    </PageContainer>
  );
}
