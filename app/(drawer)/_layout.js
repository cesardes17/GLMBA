import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import HeaderRight from "../../src/components/headerRight";
import { useTheme } from "../../src/hooks/useTheme";

export default function DrawerLayout() {
  const { theme } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.background,
          },
          drawerActiveTintColor: theme.colorIcon,
          drawerInactiveTintColor: theme.inactiveIconColor,
          drawerContentStyle: {
            backgroundColor: theme.background,
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.color,
          headerRight: () => <HeaderRight />,
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Inicio",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="settings" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Ajustes",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
