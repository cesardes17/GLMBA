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

export default function SolicitudesScreen() {
  const { theme } = useThemeContext();
  const { isMobile } = useResponsiveLayout();
  const { authUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<RequestWithId[]>([]);

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, data: { ...req.data, estado: 'aceptada' } }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, data: { ...req.data, estado: 'rechazada' } }
          : req
      )
    );
  };

  const cargarSolicitudes = useCallback(async () => {
    try {
      if (!authUser?.id) {
        console.error('No hay usuario autenticado');
        return;
      }

      const { solicitudes, error, mensaje } =
        await solicitudService.getSolicitudesUsuario(authUser.id);
      if (error) {
        console.error('Error al cargar solicitudes:', mensaje);
        return;
      }
      if (solicitudes) {
        const mappedRequests = solicitudes.map((solicitud) => {
          console.log(
            'Solicitud completa:',
            JSON.stringify(solicitud, null, 2)
          );

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
  }, [authUser?.id]);

  useEffect(() => {
    cargarSolicitudes();
  }, [cargarSolicitudes]);

  return (
    <>
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
            switch (request.data.tipo) {
              case 'crear_equipo':
                return (
                  <CreateTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    id={request.id}
                    currentUserEmail={authUser.email}
                  />
                );
              case 'unirse_equipo':
                return (
                  <JoinTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    id={request.id}
                  />
                );
              case 'baja_equipo':
                return (
                  <LeaveTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    id={request.id}
                  />
                );
              case 'disolver_equipo':
                return (
                  <DissolveTeamSolicitudCard
                    key={request.id}
                    request={request.data}
                    onAccept={handleAccept}
                    onReject={handleReject}
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
    alignItems: 'center', // Añadimos esta propiedad para centrar verticalmente
  },
  headerMobile: {
    flexDirection: 'column',
    paddingBottom: 0,
  },
  searchContainer: {
    flex: 3,
    justifyContent: 'center', // Centramos el contenido del contenedor de búsqueda
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
    height: 48, // Altura fija para el input
  },
  createButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    height: 48, // Altura fija para mantener consistencia
    alignItems: 'center', // Centramos verticalmente el contenido
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
