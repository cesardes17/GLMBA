// /app/(drawer)/_layout.js
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../src/hooks/useTheme";
import { useAuth } from "../../src/hooks/useAuth";
import { useMemo } from "react";

export default function DrawerLayout() {
  const { theme } = useTheme();
  const { user, userData } = useAuth();

  // ✅ Solo imprime cuando user o userData cambian
  useMemo(() => {
    console.log("user en layout: ", user);
    console.log("userData en layout: ", userData);
  }, [user, userData]);

  // ✅ Evita recalcular opciones en cada render
  const panelControlOptions = useMemo(
    () => ({
      title: "Panel de Control",
      drawerLabelStyle: {
        display: user && userData?.role === "organizador" ? "flex" : "none",
      },
    }),
    [user, userData]
  );

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
      <Drawer.Screen
        name="clasificacion"
        options={{ title: "Clasificación" }}
      />
      <Drawer.Screen name="partidos" options={{ title: "Jornadas" }} />
      <Drawer.Screen
        name="profile"
        options={{ title: user ? "Perfil" : "Iniciar Sesión" }}
      />
      <Drawer.Screen name="panelControl" options={panelControlOptions} />
    </Drawer>
  );
}
