// /app/(drawer)/_layout.js
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../src/hooks/useTheme";

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: theme.background },
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
        drawerActiveTintColor: theme.textColor,
        drawerInactiveTintColor: theme.textColor,
        drawerLabelStyle: { fontSize: 16, color: theme.textColor },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Inicio" }} />

      {/* Paginas que quiero que usen drawer, pero no se tenga acceso desde el drawer` */}
      <Drawer.Screen
        name="partido/[id]"
        options={{
          title: "Detalle de Partido",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
