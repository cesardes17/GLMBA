import { useEffect } from "react";
import PageContainer from "../../src/components/common/PageContainer";
import { useUser } from "../../src/context/UserContext";
import LoginScreen from "../../src/screens/auth/LoginScreen";

export default function Login() {
  const { user } = useUser();

  console.log("user Login.tsx: ", user);
  return (
    <PageContainer title="Inicio de Sesión" backTitle="Inicio">
      <LoginScreen />
    </PageContainer>
  );
}
