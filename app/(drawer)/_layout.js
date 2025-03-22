import { Drawer } from 'expo-router/drawer';
import { useTheme } from '../../src/hooks/theme/useTheme';
import { useAuth } from '../../src/hooks/auth/useAuth';
import { useRouter } from 'expo-router';

export default function DrawerLayout() {
  const { theme } = useTheme();
  const { user, userData } = useAuth();
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
          title: 'Inicio',
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="partidos"
        options={{
          title: 'Jornada',
          drawerLabel: 'Jornada',
        }}
      />
      <Drawer.Screen
        name="clasificacion"
        options={{
          title: 'Clasificación',
          drawerLabel: 'Clasificación',
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          drawerLabel: 'Perfil',
          headerShown: user,
          drawerItemStyle: {
            display: user ? 'flex' : 'none',
          },
        }}
      />
      <Drawer.Screen
        name="login-redirect"
        options={{
          title: 'Iniciar Sesión',
          drawerLabel: 'Iniciar Sesión',
          headerShown: !user,
          drawerItemStyle: {
            display: !user ? 'flex' : 'none',
          },
        }}
      />
      <Drawer.Screen
        name="userPanel-redirect"
        options={{
          title: 'Panel de Usuarios',
          drawerLabel: 'Panel de Usuarios',
          headerShown: user && userData?.role === 'organizador',
          drawerItemStyle: {
            display: user && userData?.role === 'organizador' ? 'flex' : 'none',
          },
        }}
      />
    </Drawer>
  );
}
