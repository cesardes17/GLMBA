import StyledText from '@/src/components/common/StyledText';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import { PlusIcon, WarningIcon } from '@/src/components/Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';
import { router } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RequestWithId } from '@/src/types/requests';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserContext } from '@/src/contexts/UserContext';
import StyledModal from '@/src/components/common/StyledModal';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { SolicitudesList } from '@/src/components/solicitudes/SolicitudesList';
import StyledAlert from '@/src/components/common/StyledAlert';
import { temporadaService } from '@/src/service/temporadaService';
import {
  aceptarSolicitudCrearEquipo,
  rechazarSolicitudCrearEquipo,
  aceptarSolicitudUnirseEquipo,
  rechazarSolicitudUnirseEquipo,
  aceptarSolicitudBajaEquipo,
  rechazarSolicitudBajaEquipo,
  aceptarSolicitudDisolverEquipo,
  rechazarSolicitudDisolverEquipo,
  baseSolicitudService,
} from '@/src/service/solicitudService';

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
  const [temporadaActiva, setTemporadaActiva] = useState<boolean>(false);
  const [loadingTemporada, setLoadingTemporada] = useState<boolean>(true);

  const verificarTemporadaActiva = useCallback(async () => {
    try {
      const { temporada, error } = await temporadaService.getTemporadaActiva();
      if (error) {
        throw new Error('Error al verificar la temporada activa');
      }
      setTemporadaActiva(!!temporada);
    } catch (error) {
      console.error('Error al verificar temporada:', error);
    } finally {
      setLoadingTemporada(false);
    }
  }, []);

  useEffect(() => {
    verificarTemporadaActiva();
  }, [verificarTemporadaActiva]);

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
    try {
      const { solicitud, error, mensaje } =
        nuevoEstado === 'aceptada'
          ? await aceptarSolicitudCrearEquipo(id, userID, respuesta_admin)
          : await rechazarSolicitudCrearEquipo(id, userID, respuesta_admin);

      if (error || !solicitud) {
        throw new Error(
          mensaje ||
            `Error al ${nuevoEstado === 'aceptada' ? 'aceptar' : 'rechazar'} la solicitud`
        );
      }

      // Actualizar estado local
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id
            ? {
                ...req,
                data: {
                  ...req.data,
                  estado: nuevoEstado,
                  respuesta_admin,
                  fecha_respuesta: new Date().toISOString(),
                  admin_aprobador: authUser?.email,
                },
              }
            : req
        )
      );
    } catch (error) {
      console.error('Error en el flujo de creación de equipo:', error);
    }
  };
  const handleUnirseEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    console.log('no implmentado');
  };

  const handleBajaEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    console.log('no implmentado');
  };

  const handleDisolverEquipo = async (
    id: string,
    estado: 'aceptada' | 'rechazada',
    respuesta_admin: string
  ) => {
    console.log('no implmentado');
  };

  const cargarSolicitudes = useCallback(async () => {
    setLoadingSolicitudes(true);
    try {
      if (!authUser?.id || !usuario) {
        return;
      }

      const esAdmin = usuario.rol_id === 1 || usuario.rol_id === 2;
      const { solicitudes, error, mensaje } = esAdmin
        ? await baseSolicitudService.getSolicitudesAdministrador()
        : await baseSolicitudService.getSolicitudesUsuario(authUser.id);

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

  const handleAccept = (id: string, tipo: string) => {
    abrirModal(id, 'aceptada', tipo);
  };

  const handleReject = (id: string, tipo: string) => {
    abrirModal(id, 'rechazada', tipo);
  };

  if (loadingSolicitudes || loadingTemporada) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  if (!temporadaActiva) {
    return (
      <StyledAlert variant='warning'>
        <View style={styles.alertContent}>
          <WarningIcon size={24} color={theme.warning} />
          <View style={styles.alertTextContainer}>
            <StyledText
              size='large'
              style={[styles.alertTitle, { color: theme.warning }]}
            >
              No hay una temporada activa en este momento.
            </StyledText>
            <StyledText
              style={[styles.alertDescription, { color: theme.warning }]}
            >
              Por favor, contacta con la organización o espera a que comience
              una nueva temporada.
            </StyledText>
          </View>
        </View>
      </StyledAlert>
    );
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
        {usuario?.rol_id === 1 ||
          (usuario?.rol_id === 2 && (
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
          ))}
      </View>
      <SolicitudesList
        requests={requests}
        onAccept={handleAccept}
        onReject={handleReject}
        currentUserEmail={authUser?.email}
      />
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
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertTextContainer: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontWeight: '600',
  },
  alertDescription: {
    opacity: 0.9,
  },
  alertText: {
    flex: 1,
  },
});
