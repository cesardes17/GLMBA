import { View } from "react-native";
import { useTheme } from "../../../src/hooks/useTheme";
import RegistrationScreen from "../../../src/screens/RegistrationScreen";

export default function RegistrationPage() {
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
