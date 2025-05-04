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
import { baseSolicitudService } from '../service/solicitudService/core/baseSolicitudService';
import { v4 as uuidv4 } from 'uuid'; // si estás usando uuid

export default function BolsaJugadoresScreen() {
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<VistaBolsaJugador[]>([]);
  const { usuario } = useUserContext();
  const [userId, setUserId] = useState<string>('');

  const handleSendRequest = async (jugador_id: string) => {
    try {
      const solicitudData = {
        id: uuidv4(),
        tipo: 'unirse_equipo' as const,
        estado: 'pendiente' as const,
        jugador_objetivo_id: jugador_id,
        iniciada_por_id: userId,
      };

      const { error, mensaje } =
        await baseSolicitudService.crearSolicitud(solicitudData);

      if (error) {
        console.error(mensaje || 'Error al crear la solicitud');
        return;
      }
      // Actualiza el estado de la solicitud en el jugador correspondiente
      const updatedPlayers = players.map((player) => {
        if (player.jugador_id === jugador_id) {
          return {
            ...player,
            solicitudPendiente: true,
          };
        }
        return player;
      });
      setPlayers(updatedPlayers);

      console.log('Solicitud creada exitosamente');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!usuario) return;

      const capitanId = isJugador(usuario) ? usuario.usuario_id : usuario.id;
      setUserId(capitanId);
      try {
        setIsLoading(true);
        const { data, error, mensaje } =
          await bolsaJugadoresService.getJugadoresEnBolsaConEstadoSolicitud(
            capitanId
          );

        if (error || !data) {
          console.error(mensaje || 'Error al obtener jugadores');
          return;
        }

        setPlayers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [usuario]);

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
