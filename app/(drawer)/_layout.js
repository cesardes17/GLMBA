import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "../../src/hooks/useTheme";
import { useAuth } from "../../src/hooks/useAuth";
import HeaderRight from "../../src/components/headerRight";

export default function DrawerLayout() {
  const { theme } = useTheme();
  const { user } = useAuth();

  console.log("Usuario autenticado:", user);

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
        {/* 🔹 Enlace común para todos los usuarios */}
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "Inicio", title: "Inicio" }}
        />

        {/* 🔹 Enlaces de Login y Registro */}
        <Drawer.Screen
          name="(auth)"
          options={{
            drawerLabel: "Inicio/Registro",
            title: "",
            drawerItemStyle: { display: user ? "none" : "flex" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
