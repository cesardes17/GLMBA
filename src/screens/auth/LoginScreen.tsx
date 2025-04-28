import StyledButton from '@/src/components/common/StyledButton';
import FormikLoginForm from '@/src/components/forms/auth/FormikLoginForm';
import StyledText from '@src/components/common/StyledText'; // Ensure this matches the alias setup
import { router } from 'expo-router';
import { View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FormikLoginForm />
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
