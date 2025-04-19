import { Text } from "react-native";
import PageContainer from "../../src/components/common/PageContainer";
import { ProfileScreen } from "../../src/screens/ProfileScreen";

export default function Profile() {
  return (
    <PageContainer title="Perfil">
      <ProfileScreen />
    </PageContainer>
  );
}
