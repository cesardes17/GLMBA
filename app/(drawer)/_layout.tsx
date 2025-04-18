import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../src/context/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundNavigation,
            borderWidth: 0,
          },
          headerTitleStyle: {
            color: theme.textPrimary,
          },
          headerTintColor: theme.activeElement,
          drawerActiveTintColor: theme.textPrimary,
          drawerInactiveTintColor: theme.textPrimary,
          drawerLabelStyle: {
            fontSize: 16,
            textAlign: "center",
            fontWeight: "600",
          },
          drawerStyle: {
            backgroundColor: theme.backgroundNavigation,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Inicio",
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            title: "Sobre Nosotros",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Ajustes",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
