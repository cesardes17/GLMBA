import StyledText from '@/src/components/common/StyledText';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import { PlusIcon } from '@/src/components/Icons';
import { CreateTeamSolicitudCard } from '@/src/components/solicitudes/CreateTeamSolicitudCard';
import { DissolveTeamSolicitudCard } from '@/src/components/solicitudes/DissolveTeamSolicitudCard';
import { JoinTeamSolicitudCard } from '@/src/components/solicitudes/JoinTeamSolicitudCard';
import { LeaveTeamSolicitudCard } from '@/src/components/solicitudes/LeaveTeamSolicitudCard';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';
import { router } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { solicitudService } from '@/src/service/solicitudService';
import { RequestWithId } from '@/src/types/requests';
import { useAuth } from '@/src/contexts/AuthContext';
import StyledAlert from '@/src/components/common/StyledAlert';
import { useUserContext } from '@/src/contexts/UserContext';
import StyledModal from '@/src/components/common/StyledModal';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';

export default function SolicitudesScreen() {
  const { theme } = useThemeContext();
  const { isMobile } = useResponsiveLayout();
  const { authUser } = useAuth();
  const { usuario } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<RequestWithId[]>([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalTipo, setModalTipo] = useState<'aceptada' | 'rechazada' | null>(
    null
  );
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [callbackTipo, setCallbackTipo] = useState<string>('');

  const abrirModal = (
    id: string,
    estado: 'aceptada' | 'rechazada',
    tipo: string
  ) => {
    setModalSolicitudId(id);
    setModalTipo(estado);
    setCallbackTipo(tipo);
    setMotivoRechazo('');
    setModalVisible(true);
  };

  const confirmarModal = () => {
    if (!modalSolicitudId || !modalTipo || !authUser?.id) return;

    const id = modalSolicitudId;
    const estado = modalTipo;
    const mensaje = motivoRechazo;

    switch (callbackTipo) {
      case 'crear_equipo':
        handleCrearEquipo(id, estado, mensaje, authUser.id);
        break;
      case 'unirse_equipo':
        handleUnirseEquipo(id, estado, mensaje);
        break;
      case 'baja_equipo':
        handleBajaEquipo(id, estado, mensaje);
        break;
      case 'disolver_equipo':
        handleDisolverEquipo(id, estado, mensaje);
        break;
    }
    setModalVisible(false);
  };

  const handleCrearEquipo = async (
    id: string,
    nuevoEstado: 'aceptada' | 'rechazada',
    respuesta_admin: string,
    userID: string
  ) => {
    const fecha_respuesta = new Date().toISOString();

    const { solicitud, error, mensaje } =
      await solicitudService.updateSolicitud(id, {
        estado: nuevoEstado,
        respuesta_admin,
        fecha_respuesta,
        admin_aprobador_id: userID,
      });

    if (error || !solicitud) {
      console.error('Error al actualizar solicitud:', mensaje);
      return;
    }

    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id
          ? {
              ...req,
              data: {
                ...req.data,
                estado: nuevoEstado,
                respuesta_admin,
                fecha_respuesta,
                admin_aprobador: authUser.email,
              },
            }
          : req
      )
    );
  };

  const handleUnirseEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    const result = await solicitudService.updateSolicitud(id, {
      estado,
      respuesta_admin,
      admin_aprobador_id: usuario?.id,
      fecha_respuesta: new Date().toISOString(),
    });

    if (result.error) {
      console.error('Error gestionando la solicitud:', result.mensaje);
      return;
    }
  };

  const handleBajaEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    const result = await solicitudService.updateSolicitud(id, {
      estado,
      respuesta_admin,
      admin_aprobador_id: usuario?.id,
      fecha_respuesta: new Date().toISOString(),
    });

    if (result.error) {
      console.error('Error gestionando la solicitud:', result.mensaje);
      return;
    }
  };

  const handleDisolverEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    const result = await solicitudService.updateSolicitud(id, {
      estado,
      respuesta_admin,
      admin_aprobador_id: usuario?.id,
      fecha_respuesta: new Date().toISOString(),
    });

    if (result.error) {
      console.error('Error gestionando la solicitud:', result.mensaje);
      return;
    }
  };

  const cargarSolicitudes = useCallback(async () => {
    setLoadingSolicitudes(true);
    try {
      if (!authUser?.id || !usuario) {
        console.error('No hay usuario autenticado');
        return;
      }

      const esAdmin = usuario.rol_id === 1 || usuario.rol_id === 2;
      const { solicitudes, error, mensaje } = esAdmin
        ? await solicitudService.getSolicitudesAdministrador()
        : await solicitudService.getSolicitudesUsuario(authUser.id);

      if (error) {
        console.error('Error al cargar solicitudes:', mensaje);
        return;
      }

      if (solicitudes) {
        const mappedRequests = solicitudes.map((solicitud) => {
          const getUsuarioNombre = (usuario: any) => {
            if (!usuario) return '';
            if (typeof usuario === 'object' && usuario !== null) {
              return (
                usuario.email ||
                usuario.nombre ||
                usuario.id ||
                usuario.toString()
              );
            }
            return usuario.toString();
          };

          switch (solicitud.tipo) {
            case 'crear_equipo':
              return {
                id: solicitud.id.toString(),
                data: {
                  tipo: 'crear_equipo' as const,
                  estado: solicitud.estado,
                  fecha_creacion: solicitud.fecha_creacion,
                  iniciada_por: getUsuarioNombre(solicitud.iniciada_por_id),
                  nombre_equipo: solicitud.nombre_equipo || '',
                  escudo_url: solicitud.escudo_url || '',
                  motivo: solicitud.motivo || '',
                  respuesta_admin: solicitud.respuesta_admin || '',
                  admin_aprobador: getUsuarioNombre(
                    solicitud.admin_aprobador_id
                  ),
                  fecha_respuesta: solicitud.fecha_respuesta || '',
                },
              };
            case 'unirse_equipo':
              return {
                id: solicitud.id.toString(),
                data: {
                  tipo: 'unirse_equipo' as const,
                  estado: solicitud.estado,
                  fecha_creacion: solicitud.fecha_creacion,
                  iniciada_por: getUsuarioNombre(solicitud.iniciada_por_id),
                  jugador_objetivo: getUsuarioNombre(
                    solicitud.jugador_objetivo_id
                  ),
                  equipo: solicitud.equipo_id || '',
                  capitan_objetivo: getUsuarioNombre(
                    solicitud.capitan_objetivo_id
                  ),
                  aprobado_jugador: solicitud.aprobado_jugador || false,
                  aprobado_capitan: solicitud.aprobado_capitan || false,
                },
              };
            case 'baja_equipo':
              return {
                id: solicitud.id.toString(),
                data: {
                  tipo: 'baja_equipo' as const,
                  estado: solicitud.estado,
                  fecha_creacion: solicitud.fecha_creacion,
                  iniciada_por: solicitud.iniciada_por_id || '',
                  jugador_objetivo: solicitud.jugador_objetivo_id || '',
                  equipo: solicitud.equipo_id || '',
                  motivo: solicitud.motivo || '',
                },
              };
            case 'disolver_equipo':
              return {
                id: solicitud.id.toString(),
                data: {
                  tipo: 'disolver_equipo' as const,
                  estado: solicitud.estado,
                  fecha_creacion: solicitud.fecha_creacion,
                  iniciada_por: solicitud.iniciada_por_id || '',
                  capitan_objetivo: solicitud.capitan_objetivo_id || '',
                  equipo: solicitud.equipo_id || '',
                  motivo: solicitud.motivo || '',
                },
              };
            default:
              throw new Error(
                `Tipo de solicitud no soportado: ${solicitud.tipo}`
              );
          }
        });

        setRequests(mappedRequests);
      }
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
    }
    setLoadingSolicitudes(false);
  }, [authUser?.id, usuario]);

  useEffect(() => {
    cargarSolicitudes();
  }, [cargarSolicitudes]);

  if (loadingSolicitudes) {
    return <StyledActivityIndicator message='Cargando solicitudes...' />;
  }
  return (
    <>
      <StyledModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmarModal}
        value={motivoRechazo}
        onChangeText={setMotivoRechazo}
        confirmLabel={
          modalTipo === 'aceptada' ? 'Aceptar solicitud' : 'Rechazar solicitud'
        }
      />
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View
          style={[
            styles.searchContainer,
            isMobile && styles.searchContainerMobile,
          ]}
        >
          <StyledTextInput
            style={styles.searchInput}
            placeholder='Buscar solicitudes...'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: theme.requestCard.card.background },
            isMobile && styles.createButtonMobile,
          ]}
          onPress={() => router.push('nuevaSolicitud')}
        >
          <View style={styles.buttonContent}>
            <PlusIcon size={20} color={theme.textPrimary} />
            <StyledText
              style={[styles.buttonText, { color: theme.textPrimary }]}
            >
              Crear Solicitud
            </StyledText>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {requests.length === 0 ? (
          <StyledAlert variant='info'>
            No tienes ninguna solicitud asociada a tu cuenta. Para crear una
            nueva solicitud, pulsa el botón "Crear Solicitud".
          </StyledAlert>
        ) : (
          requests.map((request) => {
            const aceptar = () =>
              abrirModal(request.id, 'aceptada', request.data.tipo);
            const rechazar = () =>
              abrirModal(request.id, 'rechazada', request.data.tipo);

            switch (request.data.tipo) {
              case 'crear_equipo':
                return (
                  <CreateTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={aceptar}
                    onReject={rechazar}
                    id={request.id}
                    currentUserEmail={authUser.email}
                  />
                );
              case 'unirse_equipo':
                return (
                  <JoinTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={aceptar}
                    onReject={rechazar}
                    id={request.id}
                  />
                );
              case 'baja_equipo':
                return (
                  <LeaveTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={aceptar}
                    onReject={rechazar}
                    id={request.id}
                  />
                );
              case 'disolver_equipo':
                return (
                  <DissolveTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={aceptar}
                    onReject={rechazar}
                    id={request.id}
                  />
                );
              default:
                return null;
            }
          })
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerMobile: {
    flexDirection: 'column',
    paddingBottom: 0,
  },
  searchContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  searchContainerMobile: {
    flex: undefined,
    width: '100%',
    marginBottom: 12,
  },
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    height: 48,
  },
  createButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    height: 48,
    alignItems: 'center',
  },
  createButtonMobile: {
    flex: undefined,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
