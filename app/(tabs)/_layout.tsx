import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../../src/context/ThemeContext";
import { View } from "react-native";

// Función para obtener el icono según el nombre de la ruta
function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} name={name} color={color} />;
}

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.activeElement,
        tabBarInactiveTintColor: theme.inactiveElement,
        headerTitleStyle: {
          color: theme.textPrimary,
        },
        headerStyle: {
          borderColor: theme.border,
        },
        // Estilos adicionales para la barra de pestañas
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: theme.backgroundNavigation,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre Nosotros",
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}
