import StyledText from '@/src/components/common/StyledText';
import { ArrowBackIcon, ArrowBackIosIcon } from '@/src/components/Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { router, Stack } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';

export default function AuthLayout() {
  const { theme } = useThemeContext();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textPrimary,
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.replace('/');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                gap: 5,
              }}
            >
              {Platform.OS === 'ios' ? (
                <ArrowBackIosIcon color={theme.textPrimary} />
              ) : (
                <ArrowBackIcon color={theme.textPrimary} />
              )}
              <StyledText>Inicio</StyledText>
            </TouchableOpacity>
          );
        },
      }}
    >
      <Stack.Screen name='login' options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name='registro' options={{ title: 'Registrarse' }} />
      <Stack.Screen
        name='completar-perfil'
        options={{ title: 'Completar Perfil' }}
      />
      {/* Agrega más pantallas según sea necesario */}
    </Stack>
  );
}
