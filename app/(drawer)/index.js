import { View, Text } from "react-native-web";
import { useTheme } from "../../src/hooks/useTheme";

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
      <Text style={{ color: theme.color }}>
        Este es un ejemplo de tema desde drawer
      </Text>
    </View>
  );
}
