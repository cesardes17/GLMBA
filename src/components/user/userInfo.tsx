import { View, StyleSheet } from 'react-native';

import StyledText from '../common/StyledText';
import EspectadorCard from './EspectadorCard';
import JugadorCard from './JugadorCard';
import { Usuario } from '@/src/interfaces/Usuario';
import { Jugador } from '@/src/interfaces/Jugador';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface PerfilCardProps {
  usuario: Usuario | Jugador | null;
}

export default function PerfilCard({ usuario }: PerfilCardProps) {
  const { theme } = useThemeContext();

  if (!usuario) {
    return (
      <View>
        <StyledText style={[styles.title, { color: theme.textPrimary }]}>
          No hay información del perfil.
        </StyledText>
      </View>
    );
  }

  // Función de type guard para verificar si es un jugador
  function isJugador(user: Usuario | Jugador): user is Jugador {
    return (
      'posicion_preferida' in user &&
      'altura_cm' in user &&
      'peso_kg' in user &&
      'foto_name' in user
    );
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        },
      ]}
    >
      {isJugador(usuario) ? (
        <JugadorCard jugador={usuario} />
      ) : (
        <EspectadorCard usuario={usuario} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});
