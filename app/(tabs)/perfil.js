import { useAuth } from '../../src/hooks/auth/useAuth';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../src/hooks/theme/useTheme';
import StyledButton from '../../src/components/common/StyledButton';
import ProfileScreen from '../../src/screens/ProfileScreen';

export default function Perfil() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  console.log('user: ', user);
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StyledButton
          title="Iniciar sesión"
          onPress={() => router.push('/login')}
        />
      </View>
    );
  }

  return <ProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
