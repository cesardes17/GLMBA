import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTheme } from "../../src/hooks/useTheme";
import { colors } from "../../src/theme/colors";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        // Color de texto activo e inactivo
        tabBarActiveTintColor: theme.colorIcon,
        tabBarInactiveTintColor: theme.inactiveIconColor || "#888",
        // Estilos de la barra de tabs
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.borderColor || "#ccc",
          height: 60,
          paddingBottom: 10,
        },
        // Estilos del header (si lo usas)
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.color,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
