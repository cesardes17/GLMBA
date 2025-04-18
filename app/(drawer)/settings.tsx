import { Text } from "react-native";
import PageContainer from "../../src/components/common/PageContainer";
import { SettingsScreen } from "../../src/screens/SettingsScreen";

export default function About() {
  return (
    <PageContainer title="Ajustes">
      <SettingsScreen />
    </PageContainer>
  );
}
