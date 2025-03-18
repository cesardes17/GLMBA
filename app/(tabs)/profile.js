import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import { useTheme } from "../../src/hooks/useTheme";
import SettingsScreen from "../../src/screens/SettingsScreen";
import { useAuth } from "../../src/hooks/useAuth";
import StyledButton from "../../src/components/StyledButton";
import { useRouter } from "expo-router";
import Separator from "../../src/components/Separator";

export default function ProfilePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  // Definir si se debe usar `KeyboardAvoidingView`
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  const Container = isMobile ? KeyboardAvoidingView : View;

  return (
    <Container
      behavior={isMobile ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20, // Espacio para evitar que quede pegado a los bordes
        }}
        keyboardShouldPersistTaps="handled"
      >
        {!user && (
          <>
            <StyledButton
              title="Iniciar sesión"
              onPress={() => {
                router.push("/login");
              }}
            />

            <Text style={{ color: theme.textColor, marginTop: 20 }}>
              Sit culpa culpa nulla eu. Nostrud elit fugiat id esse qui nostrud
              anim anim. Sunt irure elit pariatur aliquip labore adipisicing non
              deserunt consequat sunt quis esse aliqua reprehenderit. Proident
              in officia irure fugiat ipsum dolore tempor proident magna. Anim
              ad reprehenderit nisi ad. Do labore aute officia mollit non Lorem
              labore cupidatat adipisicing tempor veniam. Amet do excepteur
              tempor non aliquip ipsum.{" "}
            </Text>
            <Text style={{ color: theme.textColor, marginTop: 20 }}>
              Sit culpa culpa nulla eu. Nostrud elit fugiat id esse qui nostrud
              anim anim. Sunt irure elit pariatur aliquip labore adipisicing non
              deserunt consequat sunt quis esse aliqua reprehenderit. Proident
              in officia irure fugiat ipsum dolore tempor proident magna. Anim
              ad reprehenderit nisi ad. Do labore aute officia mollit non Lorem
              labore cupidatat adipisicing tempor veniam. Amet do excepteur
              tempor non aliquip ipsum.{" "}
            </Text>
            <Text style={{ color: theme.textColor, marginTop: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </>
        )}
        <SettingsScreen />
      </ScrollView>
    </Container>
  );
}
