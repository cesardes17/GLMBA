import {
  CalendarioIcon,
  ClasificacionIcon,
  CompletarPerfilIcon,
  HomeIcon,
  LoginIcon,
  NavegacionIcon,
  PerfilIcon,
} from '@/src/components/Icons';
import { useAuth } from '@/src/contexts/AuthContext';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const { theme } = useThemeContext();
  const { usuario } = useUserContext();
  const { authUser } = useAuth();

  const showLogin = !authUser;
  const showCompletarPerfil = authUser && !usuario;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.backgroundNavigation,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.activeElement,
        tabBarInactiveTintColor: theme.inactiveElement,
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTitleStyle: {
          color: theme.textPrimary,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name='calendario'
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, size }) => (
            <CalendarioIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='clasificacion'
        options={{
          title: 'Clasificación',
          tabBarIcon: ({ color, size }) => (
            <ClasificacionIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='perfil-helper'
        options={{
          title: showLogin
            ? 'Login'
            : showCompletarPerfil
              ? 'Completar perfil'
              : 'Perfil',
          tabBarIcon: ({ color, size }) =>
            showLogin ? (
              <LoginIcon color={color} size={size} />
            ) : showCompletarPerfil ? (
              <CompletarPerfilIcon color={color} size={size} />
            ) : (
              <PerfilIcon color={color} size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name='navigation'
        options={{
          title: 'Más',
          tabBarIcon: ({ color, size }) => (
            <NavegacionIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
