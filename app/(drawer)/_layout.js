import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../src/hooks/useTheme";
import HeaderRight from "../../src/components/headerRight";

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: theme.background },
          drawerActiveTintColor: theme.colorIcon,
          drawerInactiveTintColor: theme.inactiveIconColor,
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.color,
          headerRight: () => <HeaderRight />,
        }}
      >
        {/* 🔹 Solo agregamos las rutas que queremos en el Drawer */}
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "Inicio", title: "Inicio" }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: "Ajustes", title: "Ajustes" }}
        />
        <Drawer.Screen
          name="login"
          options={{ drawerLabel: "Login", title: "Inicio de Sesion" }}
        />
        <Drawer.Screen
          name="registration"
          options={{ drawerLabel: "", title: "Crear una Cuenta" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
