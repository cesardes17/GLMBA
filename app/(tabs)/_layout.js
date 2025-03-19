// /app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import { useTheme } from "../../src/hooks/useTheme";
import { Platform } from "react-native";
import {
  HomeIcon,
  CalendarCheckIcon,
  ClasificationIcon,
  EllipsisIcon,
  ProfileIcon,
} from "../../src/components/Icons";
export default function TabsLayout() {
  const { theme } = useTheme();
  const isWeb = Platform.OS === "web";

  if (isWeb) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.background },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: theme.inactiveIconColor,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="partidos"
        options={{
          title: "Jornadas",
          tabBarIcon: ({ color, size }) => (
            <CalendarCheckIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="clasificacion"
        options={{
          title: "Clasificación",
          tabBarIcon: ({ color, size }) => (
            <ClasificationIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Login / Profile",
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="links"
        options={{
          title: "Más",
          tabBarIcon: ({ color, size }) => (
            <EllipsisIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
