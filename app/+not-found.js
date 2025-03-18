import { View, Text } from "react-native";
import { useTheme } from "../src/hooks/useTheme";
import { useRouter } from "expo-router";
import StyledButton from "../src/components/StyledButton";

export default function HomePage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.color }}>PAGINA NO ENCONTRADA </Text>
      <StyledButton
        title="Ir a Inicio"
        onPress={() => {
          router.push("/");
        }}
      />
    </View>
  );
}
