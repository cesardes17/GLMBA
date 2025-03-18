import { View, Text } from "react-native";
import { useTheme } from "../../src/hooks/useTheme";

export default function GamesPage() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.color }}>Working on Games Page</Text>
    </View>
  );
}
