import { View, Text, Button } from "react-native-web";
import { useTheme } from "../src/hooks/useTheme";
import { Link } from "expo-router";

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
      <Text style={{ color: theme.color }}>PAGINA NO ENCONTRADA </Text>
      <Link href={"/"}>
        <Button title="Regresar" />
      </Link>
    </View>
  );
}
