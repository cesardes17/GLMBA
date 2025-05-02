import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StyledText from '../common/StyledText';
import { PaperAirplaneIcon, CheckCircleIcon } from '../Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { VistaBolsaJugador } from '@/src/interfaces/vistas/VistaBolsaJugador';

interface Props {
  player: VistaBolsaJugador;
  onSendRequest?: (jugador_id: string) => void;
}

export default function PlayerCard({ player, onSendRequest }: Props) {
  const { theme } = useThemeContext();
  const { usuario } = useUserContext();

  const esCapitan = usuario?.rol_id === 4;
  const puedeEnviar = esCapitan && !player.solicitudPendiente;

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.left}>
        <Image
          source={{ uri: player.foto_url }}
          style={[styles.image, { borderColor: theme.border }]}
        />
        <View style={styles.info}>
          <StyledText weight='bold'>{`${player.nombre} ${player.apellidos}`}</StyledText>
          <StyledText size='small'>
            Posición: {player.posicion_preferida}
          </StyledText>
          <StyledText size='small'>
            Dorsal: {player.dorsal_preferido}
          </StyledText>
        </View>
      </View>

      {esCapitan && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: puedeEnviar ? theme.primary : theme.textDisabled,
            },
          ]}
          onPress={() => onSendRequest?.(player.jugador_id)}
          disabled={!puedeEnviar}
        >
          {player.solicitudPendiente ? (
            <>
              <CheckCircleIcon size={16} color={theme.textPrimary} />
              <StyledText style={styles.buttonText}>Enviada</StyledText>
            </>
          ) : (
            <>
              <PaperAirplaneIcon size={16} color={theme.textPrimary} />
              <StyledText style={styles.buttonText}>Solicitar</StyledText>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    marginLeft: 6,
    fontWeight: '600',
  },
});
