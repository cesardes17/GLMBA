import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTheme } from "../../src/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
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
          height: 80,
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
