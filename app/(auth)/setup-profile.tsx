import { router } from "expo-router";
import PageContainer from "../../src/components/common/PageContainer";
import { useUser } from "../../src/context/UserContext";
import SetupProfileScreen from "../../src/screens/auth/SetupProfileScreen";
import { isUsuario } from "../../src/types/usuario";

export default function SetupProfile() {
  const { user } = useUser();
  if (user === null) {
    router.replace("/login");
  } else if (isUsuario(user)) {
    router.replace("/profile");
  }
  return (
    <PageContainer title="Completar Perfil" backTitle="Inicio">
      <SetupProfileScreen />
    </PageContainer>
  );
}
