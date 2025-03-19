// /app/+not-found.js
import { View } from "react-native";
import StyledText from "../src/components/StyledText";
import { useTheme } from "../src/hooks/useTheme";
import { useRouter } from "expo-router";
import StyledButton from "../src/components/StyledButton";

export const unstable_settings = {
  // Oculta esta ruta del Drawer
  drawerItem: {
    hide: true,
  },
};

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
      <StyledText>PAGINA NO ENCONTRADA </StyledText>
      <StyledButton
        title="Ir a Inicio"
        onPress={() => {
          router.push("/");
        }}
      />
    </View>
  );
}
