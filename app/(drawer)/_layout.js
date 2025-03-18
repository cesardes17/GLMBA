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
          headerTintColor: theme.colorIcon,
          headerTitleStyle: { color: theme.textColor },
          headerRight: () => <HeaderRight />,
        }}
      >
        {/* 🔹 Enlace común para todos los usuarios */}
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "Inicio", title: "Inicio" }}
        />
        <Drawer.Screen
          name="games"
          options={{
            drawerLabel: "Jornadas",
            title: "Jornadas",
          }}
        />
        <Drawer.Screen
          name="clasification"
          options={{
            drawerLabel: "Clasificación",
            title: "Clasificación",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: user ? "Perfil" : "Iniciar sesión",
            title: user ? "Perfil" : "Iniciar sesión",
          }}
        />

        {/* 🔹 Enlaces de Login y Registro */}
        <Drawer.Screen
          name="(auth)"
          options={{
            drawerLabel: "",
            title: "",
            drawerItemStyle: { display: user ? "none" : "flex" },
          }}
        />
        <Drawer.Screen
          name="(organizadores)"
          options={{
            drawerLabel: "",
            title: "",
            drawerItemStyle: { display: user ? "none" : "flex" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
