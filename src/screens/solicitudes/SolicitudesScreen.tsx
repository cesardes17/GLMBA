import StyledText from '@/src/components/common/StyledText';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import { PlusIcon, WarningIcon } from '@/src/components/Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';
import { router, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RequestWithId } from '@/src/types/requests';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserContext } from '@/src/contexts/UserContext';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { SolicitudesList } from '@/src/components/solicitudes/SolicitudesList';
import StyledAlert from '@/src/components/common/StyledAlert';
import ConfirmModal from '@/src/components/common/ConfirmModal';
import InputModal from '@/src/components/common/InputModal';
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
  const [actualizandoSolicitud, setactualizandoSolicitud] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalTipo, setModalTipo] = useState<'aceptada' | 'rechazada' | null>(
    null
  );
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [callbackTipo, setCallbackTipo] = useState<string>('');
  const [temporadaActiva, setTemporadaActiva] = useState<boolean>(false);
  const [loadingTemporada, setLoadingTemporada] = useState<boolean>(true);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const esAdmin = usuario?.rol_id === 1 || usuario?.rol_id === 2;

  const verificarTemporadaActiva = useCallback(async () => {
    try {
      const { temporada, error } = await temporadaService.getTemporadaActiva();
      if (error) throw new Error('Error al verificar la temporada activa');
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
    if (esAdmin) {
      setModalVisible(true);
    } else {
      setIsConfirmModalVisible(true);
    }
  };

  const confirmarModal = async () => {
    if (!modalSolicitudId || !modalTipo || !authUser?.id) return;
    setactualizandoSolicitud(true);

    const id = modalSolicitudId;
    const estado = modalTipo;
    const mensaje = motivoRechazo;

    try {
      switch (callbackTipo) {
        case 'crear_equipo':
          const {
            solicitud,
            error,
            mensaje: msg,
          } = estado === 'aceptada'
            ? await aceptarSolicitudCrearEquipo(id, authUser.id, mensaje)
            : await rechazarSolicitudCrearEquipo(id, authUser.id, mensaje);

          if (error || !solicitud) throw new Error(msg || 'Error');

          setRequests((prev) =>
            prev.map((req) =>
              req.id === id
                ? {
                    ...req,
                    data: {
                      ...req.data,
                      estado,
                      respuesta_admin: mensaje,
                      fecha_respuesta: new Date().toISOString(),
                      admin_aprobador: authUser?.email,
                    },
                  }
                : req
            )
          );
          break;

        default:
          console.log('No implementado aún');
          break;
      }
    } catch (error) {
      console.error(error);
    }

    setModalVisible(false);
    setIsConfirmModalVisible(false);
    setactualizandoSolicitud(false);
  };

  const cargarSolicitudes = useCallback(async () => {
    setLoadingSolicitudes(true);
    try {
      if (!authUser?.id || !usuario) return;

      const esAdmin = usuario.rol_id === 1 || usuario.rol_id === 2;
      const { solicitudes, error } = esAdmin
        ? await baseSolicitudService.getSolicitudesAdministrador()
        : await baseSolicitudService.getSolicitudesUsuario(authUser.id);

      if (error) return;

      if (solicitudes) {
        setRequests(solicitudes);
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingSolicitudes(false);
  }, [authUser?.id, usuario]);

  useFocusEffect(
    useCallback(() => {
      cargarSolicitudes();
    }, [cargarSolicitudes])
  );

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

  if (actualizandoSolicitud) {
    return <StyledActivityIndicator message='Actualizando...' />;
  }

  return (
    <>
      <InputModal
        visible={modalVisible}
        value={motivoRechazo}
        onChangeText={setMotivoRechazo}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmarModal}
        title={
          modalTipo === 'aceptada' ? 'Aceptar solicitud' : 'Rechazar solicitud'
        }
        confirmLabel='Confirmar'
        cancelLabel='Cancelar'
      />

      <ConfirmModal
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={confirmarModal}
        title='¿Confirmas esta acción?'
        message='Esta acción no se puede deshacer.'
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
        {usuario?.rol_id !== 1 && usuario?.rol_id !== 2 && (
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
        )}
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
  container: { padding: 12 },
  header: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerMobile: { flexDirection: 'column', paddingBottom: 0 },
  searchContainer: { flex: 3, justifyContent: 'center' },
  searchContainerMobile: { flex: undefined, width: '100%', marginBottom: 12 },
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
  createButtonMobile: { flex: undefined, width: '100%' },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: { fontSize: 16, fontWeight: '500' },
  alertContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  alertTextContainer: { flex: 1, gap: 4 },
  alertTitle: { fontWeight: '600' },
  alertDescription: { opacity: 0.9 },
  alertText: { flex: 1 },
});
