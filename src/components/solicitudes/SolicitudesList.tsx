import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import { RequestWithId } from '@/src/types/requests';
import {
  aceptarSolicitudUnirseEquipo,
  baseSolicitudService,
  rechazarSolicitudUnirseEquipo,
} from '@/src/service/solicitudService';
import { useUserContext } from '@/src/contexts/UserContext';
import { useAuth } from '@/src/contexts/AuthContext';
import SolicitudItemRenderer from './SolicitudItemRenderer';
import StyledAlert from '../common/StyledAlert';
import StyledText from '../common/StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import ConfirmSolicitudModal from './ConfirmSolicitudModal';
import { inscripcionService } from '@/src/service/inscripcionJugadorService';
import { isJugador } from '@/src/interfaces/Jugador';

export default function SolicitudesList() {
  const { authUser } = useAuth();
  const { usuario } = useUserContext();
  const { theme } = useThemeContext();
  const [requests, setRequests] = useState<RequestWithId[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState<
    'crear_equipo' | 'unirse_equipo' | 'baja_equipo' | 'disolver_equipo' | null
  >(null);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalEsAceptacion, setModalEsAceptacion] = useState<boolean>(true);
  const [dorsalesOcupados, setDorsalesOcupados] = useState<number[]>([]);
  const usuarioID = isJugador(usuario!) ? usuario.usuario_id : usuario!.id;
  const esAdmin = usuario?.rol_id === 1 || usuario?.rol_id === 2;

  const loadSolicitudes = useCallback(async () => {
    if (!authUser || !usuario) return;

    const { solicitudes, error } = esAdmin
      ? await baseSolicitudService.getSolicitudesAdministrador()
      : await baseSolicitudService.getSolicitudesUsuario(authUser.id);

    if (!error && solicitudes) setRequests(solicitudes);
  }, [authUser, usuario, esAdmin]);

  useEffect(() => {
    loadSolicitudes();
  }, [loadSolicitudes]);

  const abrirModal = (
    id: string,
    tipo: 'crear_equipo' | 'unirse_equipo' | 'baja_equipo' | 'disolver_equipo',
    esAceptacion: boolean
  ) => {
    setModalSolicitudId(id);
    setModalTipo(tipo);
    setModalEsAceptacion(esAceptacion);
    setModalVisible(true);
  };

  const handleAccept = async (id: string, tipo: string) => {
    const solicitud = requests.find((r) => r.id === id);
    if (!solicitud) return;

    if (
      tipo === 'unirse_equipo' &&
      usuario?.rol_id === 5 &&
      solicitud.data.tipo === 'unirse_equipo'
    ) {
      const equipoId = solicitud.data.equipo.id;

      try {
        const { dorsales, error, mensaje } =
          await inscripcionService.getDorsalesFromTeam(equipoId);

        if (error || !dorsales) {
          console.error('Error al obtener los dorsales:', mensaje);
          return;
        }

        setDorsalesOcupados(dorsales);
      } catch (e) {
        console.error('Error inesperado:', e);
      }
    } else {
      setDorsalesOcupados([]);
    }

    abrirModal(id, tipo as any, true);
  };

  const handleReject = (id: string, tipo: string) => {
    abrirModal(id, tipo as any, false);
  };

  const confirmarModal = async (dorsal?: number, motivo?: string) => {
    if (!modalSolicitudId || !modalTipo) return;
    console.log('confirmarModal');
    console.log('modalSolicitudId', modalSolicitudId);
    console.log('modalTipo', modalTipo);
    console.log('modalEsAceptacion', modalEsAceptacion);
    switch (modalTipo) {
      case 'crear_equipo':
        if (modalEsAceptacion) {
          // TODO: Aceptar Crear equipo
        } else {
          // TODO: rechazar Crear equipo
        }
        break;
      case 'unirse_equipo':
        if (modalEsAceptacion) {
          // TODO: Aceptar solicitud equipo
          const { solicitud, error, mensaje } =
            await aceptarSolicitudUnirseEquipo(
              modalSolicitudId,
              usuarioID,
              esAdmin,
              motivo,
              dorsal
            );

          if (error || !solicitud) {
            console.error('Error al aceptar la solicitud:', mensaje);
            return;
          }

          // Actualizar la solicitud con los nuevos datos
          setRequests((prevRequests) =>
            prevRequests.map((r) =>
              r.id === modalSolicitudId ? { ...r, ...solicitud } : r
            )
          );

          setModalVisible(false);

          // Recargar las solicitudes para asegurar que la lista está actualizada
          await loadSolicitudes();
        } else {
          // TODO: Rechazar solicitud equipo
          const { solicitud, error, mensaje } =
            await rechazarSolicitudUnirseEquipo(
              modalSolicitudId,
              usuarioID,
              esAdmin,
              motivo
            );
          if (error || !solicitud) {
            console.error('Error al aceptar la solicitud:', mensaje);
            return;
          }
          // Actualizar la solicitud con los nuevos datos
          setRequests((prevRequests) =>
            prevRequests.map((r) =>
              r.id === modalSolicitudId ? { ...r, ...solicitud } : r
            )
          );

          setModalVisible(false);
        }
        break;
      default:
        console.log('tipo solicitud no valida');
    }
  };

  const renderItem = ({ item }: { item: RequestWithId }) => (
    <SolicitudItemRenderer
      solicitud={item}
      onAccept={handleAccept}
      onReject={handleReject}
      esAdmin={esAdmin}
    />
  );

  return (
    <>
      {modalTipo && (
        <ConfirmSolicitudModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={(dorsal, motivo) => {
            confirmarModal(dorsal, motivo);
          }}
          tipoSolicitud={modalTipo!}
          esAdmin={esAdmin}
          esJugador={usuario?.rol_id === 5}
          dorsalesOcupados={dorsalesOcupados}
          esAceptacion={modalEsAceptacion}
        />
      )}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <StyledAlert variant='info'>
            <StyledText style={{ color: theme.info }}>
              No hay solicitudes disponibles
            </StyledText>
          </StyledAlert>
        )}
      />
    </>
  );
}
