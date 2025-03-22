import { useAuth } from "../../src/hooks/useAuth";
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "../../src/hooks/useTheme";
import StyledButton from "../../src/components/StyledButton";

export default function Perfil() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StyledButton
          title="Iniciar sesión"
          onPress={() => router.push('/login')}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Perfil</Text>
    </View>
  );
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