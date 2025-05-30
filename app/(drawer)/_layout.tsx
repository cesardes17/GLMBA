import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Layout() {
  const { theme } = useThemeContext();
  const { usuario, loading } = useUserContext();
  const { authUser } = useAuth();
  const showLogin = !authUser;
  const showCompletarPerfil = authUser && !usuario;

  if (loading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          swipeEdgeWidth: 100,
          headerTintColor: theme.textPrimary, // <- esto cambia el color del icono del Drawer

          drawerStyle: {
            backgroundColor: theme.backgroundNavigation,
          },
          headerStyle: {
            backgroundColor: theme.backgroundNavigation,
          },
          headerTitleStyle: {
            color: theme.textPrimary,
            textAlign: 'center',
          },
          drawerActiveTintColor: theme.activeElement,
          drawerInactiveTintColor: theme.inactiveElement,
        }}
      >
        <Drawer.Screen name='index' options={{ title: 'Inicio' }} />
        <Drawer.Screen name='calendario' options={{ title: 'Calendario' }} />
        <Drawer.Screen
          name='clasificacion'
          options={{ title: 'Clasificación' }}
        />
        <Drawer.Screen
          name='perfil-helper'
          options={{
            title: showLogin
              ? 'Login'
              : showCompletarPerfil
                ? 'Completar perfil'
                : 'Perfil',
          }}
        />
        <Drawer.Screen name='solicitudes' options={{ title: 'Solicitudes' }} />
        <Drawer.Screen
          name='panelControl'
          options={{
            title: 'Panel de Control',
            drawerItemStyle: {
              display:
                usuario?.rol_id && [1, 2].includes(usuario.rol_id)
                  ? 'flex'
                  : 'none',
            },
          }}
        />
        <Drawer.Screen
          name='bolsaJugadores'
          options={{
            title: 'Bolsa de Jugadores',
            drawerItemStyle: {
              display:
                usuario?.rol_id && [1, 2, 4].includes(usuario.rol_id)
                  ? 'flex'
                  : 'none',
            },
          }}
        />
        <Drawer.Screen name='ajustes' options={{ title: 'Ajustes' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
