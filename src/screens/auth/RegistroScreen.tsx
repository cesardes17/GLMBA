import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledButton from '@/src/components/common/StyledButton';
import FormikRegistroForm from '@/src/components/forms/auth/FormikRegistroForm';
import StyledText from '@src/components/common/StyledText'; // Ensure this matches the alias setup
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function RegistroScreen() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FormikRegistroForm setIsLoading={setIsLoading} />
      <StyledText style={{ marginBottom: 8 }}>
        ¿Tienes cuenta? Inicia Sesión aquí.
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
