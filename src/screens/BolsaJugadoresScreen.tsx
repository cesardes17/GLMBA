import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import PlayerCard from '../components/bolsaJugadores/jugadorCard';
import StyledActivityIndicator from '../components/common/StyledActivitiIndicator';
import StyledAlert from '../components/common/StyledAlert';
import { bolsaJugadoresService } from '../service/bolsaJugadoresService';
import { useUserContext } from '../contexts/UserContext';
import { isJugador } from '../interfaces/Jugador';
import { VistaBolsaJugador } from '../interfaces/vistas/VistaBolsaJugador';

export default function BolsaJugadoresScreen() {
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<VistaBolsaJugador[]>([]);
  const { usuario } = useUserContext();
  const [userId, setUserId] = useState<string>('');

  const handleSendRequest = (jugador_id: string) => {
    // Aquí iría la lógica para enviar una solicitud al jugador
    console.log(`Solicitud enviada a jugador ID: ${jugador_id}`);
  };

  useEffect(() => {
    if (!usuario) return;

    if (!isJugador(usuario)) {
      setUserId(usuario.id);
    } else {
      setUserId(usuario.usuario_id);
    }
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        console.log(
          'Llamando al servicio getJugadoresEnBolsaConEstadoSolicitud...'
        );
        const { data, error, mensaje } =
          await bolsaJugadoresService.getJugadoresEnBolsaConEstadoSolicitud(
            userId
          );

        if (error || !data) {
          console.error(mensaje || 'Error al obtener jugadores');
          return;
        }
        console.log(data);

        setPlayers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [userId, usuario]);

  if (isLoading) {
    return <StyledActivityIndicator message='Cargando Jugadores...' />;
  }

  if (players.length === 0) {
    return (
      <StyledAlert variant='info'>
        No hay jugadores disponibles en la bolsa.
      </StyledAlert>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <FlatList
        data={players}
        keyExtractor={(item) => item.jugador_id.toString()} // Clave única
        renderItem={({ item }) => (
          <PlayerCard player={item} onSendRequest={handleSendRequest} />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
