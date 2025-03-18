import { View } from "react-native";
import { useTheme } from "../../src/hooks/useTheme";
import SettingsScreen from "../../src/screens/SettingsScreen";
import { useAuth } from "../../src/hooks/useAuth";
import StyledButton from "../../src/components/StyledButton";
import { useRouter } from "expo-router";
export default function ProgilePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledButton
          title="Iniciar sesión"
          onPress={() => {
            router.push("/login");
          }}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SettingsScreen />
    </View>
  );
}
