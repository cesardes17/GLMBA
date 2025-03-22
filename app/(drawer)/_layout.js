import { Drawer } from 'expo-router/drawer';
import { useTheme } from "../../src/hooks/useTheme";
import { useAuth } from "../../src/hooks/useAuth";
import { useRouter } from 'expo-router';

export default function DrawerLayout() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: theme.background },
        drawerActiveTintColor: theme.colorIcon,
        drawerInactiveTintColor: theme.inactiveIconColor,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',        
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Inicio",
          drawerLabel: "Inicio",
        }}
      />
      <Drawer.Screen
        name="partidos"
        options={{
          title: "Jornada",
          drawerLabel: "Jornada",
        }}
      />
      <Drawer.Screen
        name="clasificacion"
        options={{
          title: "Clasificación",
          drawerLabel: "Clasificación",
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          title: "Perfil",
          drawerLabel: "Perfil",
          headerShown: isAuthenticated,
          drawerItemStyle: { 
            display: isAuthenticated ? 'flex' : 'none' 
          }
        }}
      />
      <Drawer.Screen
        name="login-redirect"
        options={{
          title: "Iniciar Sesión",
          drawerLabel: "Iniciar Sesión",
          headerShown: !isAuthenticated,
          drawerItemStyle: { 
            display: !isAuthenticated ? 'flex' : 'none' 
          },
        }}
      />
    </Drawer>
  );
}