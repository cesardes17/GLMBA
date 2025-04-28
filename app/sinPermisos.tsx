import { router } from 'expo-router';
import { Button, View, StyleSheet, Text } from 'react-native';

export default function SinPermisosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso denegado</Text>
      <Text style={styles.description}>
        No tienes permiso para acceder a esta página.
      </Text>
      <Button title='Volver al inicio' onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
});
