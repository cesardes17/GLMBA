import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Layout() {
  const { theme } = useThemeContext();
  const { usuario } = useUserContext();
  const { authUser } = useAuth();
  const showLogin = !authUser;
  const showCompletarPerfil = authUser && !usuario;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          swipeEdgeWidth: 100,
          headerTintColor: theme.textPrimary, // <- esto cambia el color del icono del Drawer

          drawerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerStyle: {
            backgroundColor: theme.backgroundColor,
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
        <Drawer.Screen name='partidos' options={{ title: 'Partidos' }} />
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
        {/*<Drawer.Screen
          name='administrarUsuarios'
          options={{
            title: 'Adminstrar Usuarios',
            drawerItemStyle: {
              display:
                usuario?.rol_nombre &&
                ['Organizador', 'Coorganizador'].includes(usuario.rol_nombre)
                  ? 'flex'
                  : 'none',
            },
          }}
        />
        <Drawer.Screen
          name='administrarJugadores'
          options={{
            title: 'Adminstrar Jugadores',
            drawerItemStyle: {
              display:
                usuario?.rol_nombre &&
                ['Organizador', 'Coorganizador'].includes(usuario.rol_nombre)
                  ? 'flex'
                  : 'none',
            },
          }}
        /> */}
        <Drawer.Screen name='ajustes' options={{ title: 'Ajustes' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
