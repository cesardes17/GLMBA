import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import StyledButton from '../src/components/StyledButton';
import Screen from '../src/components/layout/Screen';
import StyledText from '../src/components/StyledText';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <Screen style={styles.container}>
      <StyledText style={styles.title}>Access Denied</StyledText>
      <StyledText style={styles.message}>
        No tienes el rol adecuado para visualizar esta información.
      </StyledText>
      <StyledButton
        title="Volver a Inicio"
        onPress={() => router.replace('/')}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  button: {
    marginTop: 16,
  },
});
