import { View } from "react-native-web";
import { useTheme } from "../../src/hooks/useTheme";
import LoginScreen from "../../src/screens/LoginScreen";
export default function HomePage() {
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
