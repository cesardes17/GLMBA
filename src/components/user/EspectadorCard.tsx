import { View, StyleSheet } from 'react-native';

import StyledText from '../common/StyledText';

import { Usuario } from '@/src/interfaces/Usuario';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface EspectadorCardProps {
  usuario: Usuario;
}

export default function EspectadorCard({ usuario }: EspectadorCardProps) {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      <StyledText style={[styles.title, { color: theme.textPrimary }]}>
        Información del Espectador:
      </StyledText>
      <StyledText style={{ color: theme.textPrimary }}>
        Nombre: {usuario.nombre}
      </StyledText>
      <StyledText style={{ color: theme.textPrimary }}>
        Apellidos: {usuario.apellidos}
      </StyledText>
      <StyledText style={{ color: theme.textPrimary }}>
        Email: {usuario.email}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
});
