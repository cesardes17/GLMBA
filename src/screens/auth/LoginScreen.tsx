import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledButton from '@/src/components/common/StyledButton';
import FormikLoginForm from '@/src/components/forms/auth/FormikLoginForm';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserContext } from '@/src/contexts/UserContext';
import StyledText from '@src/components/common/StyledText'; // Ensure this matches the alias setup
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const { fetchUserData, usuario } = useUserContext();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await login(email, password);
      if (error) {
        throw new Error(error);
      }
      if (!data) {
        throw new Error('No se recibieron datos del servidor');
      }
      await fetchUserData();
      router.replace('/');
    } catch (err) {
      if ((err as Error).message.includes('Invalid login credentials')) {
        setError('El email o la contraseña son incorrectos.');
      } else if ((err as Error).message.includes('network')) {
        setError('Error de conexión. Verifica tu conexión a internet.');
      } else if ((err as Error).message.includes('baneado')) {
        setError('Su cuenta ha sido baneada, no puede inicar sesión.');
      } else {
        setError('Ha ocurrido un error. Inténtalo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (usuario) {
    return null; // Usuario logueado
  }

  if (loading) {
    return <StyledActivityIndicator message='Iniciando sesión...' />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error && (
        <StyledAlert variant='error'>
          <StyledText>{error}</StyledText>
        </StyledAlert>
      )}
      <FormikLoginForm onSubmit={handleLogin} />
      <StyledText style={{ marginBottom: 8 }}>
        ¿No tienes cuenta? Crea una cuenta aquí.
      </StyledText>
      <StyledButton
        variant='outline'
        title='Registrarse'
        onPress={() => {
          router.replace('/registro');
        }}
      />
    </View>
  );
}
