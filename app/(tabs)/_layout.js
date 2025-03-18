// /app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import { useTheme } from "../../src/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../src/hooks/useAuth";

export default function TabsLayout() {
  const { theme } = useTheme();
  const { user } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorIcon,
        tabBarInactiveTintColor: theme.inactiveIconColor,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.borderColor,
          height: 80,
        },
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.color,
      }}
    >
      <Tabs.Screen
        name="games"
        options={{
          title: "Jornadas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clasification"
        options={{
          title: "Clasificación",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-ol" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: user ? "Perfil" : "Iniciar sesión",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="links"
        options={{
          title: "Enlaces",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="ellipsis-h" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(auth)"
        options={{
          title: "Autenticación",
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="(organizador)"
        options={{
          title: "Autenticación",
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="(links)"
        options={{
          title: "Autenticación",
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
