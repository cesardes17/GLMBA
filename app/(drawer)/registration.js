import { View } from "react-native-web";
import { useTheme } from "../../src/hooks/useTheme";
import RegistrationScreen from "../../src/screens/RegistrationScreen";
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
      <RegistrationScreen />
    </View>
  );
}
