import { View } from "react-native";
import { useTheme } from "../../src/hooks/useTheme";
import SettingsScreen from "../../src/screens/SettingsScreen";
export default function HomePage() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#00FF00",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SettingsScreen />
    </View>
  );
}
