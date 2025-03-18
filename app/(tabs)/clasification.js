import { View, Text } from "react-native";
import { useTheme } from "../../src/hooks/useTheme";

export default function ClasificationPage() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.color }}>Working on Clasification Page</Text>
    </View>
  );
}
