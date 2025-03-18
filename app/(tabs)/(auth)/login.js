import { View, Text } from "react-native";
import { useTheme } from "../../../src/hooks/useTheme";
import LoginScreen from "../../../src/screens/LoginScreen";

export default function LoginPage() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginScreen />
    </View>
  );
}
