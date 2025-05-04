import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledButton from '@/src/components/common/StyledButton';
import StyledText from '@/src/components/common/StyledText';
import StyledModal from '@/src/components/common/StyledModal';
import PerfilCard from '@/src/components/user/userInfo';

import { useAuth } from '@/src/contexts/AuthContext';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { bolsaJugadoresService } from '@/src/service/bolsaJugadoresService';
import { jugadorExtendidoService } from '@/src/service/jugadorExtendidoService';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { JugadorConEquipo } from '@/src/interfaces/vistas/JugadorConEquipo';

export default function PerfilScreen() {
  const { logout } = useAuth();
  const { theme } = useThemeContext();
  const { usuario, loading } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [mensajeBolsa, setMensajeBolsa] = useState<string | null>(null);
  const [permitirInscripcion, setPermitirInscripcion] = useState(false);
  const [showModal, setShowModal] = useState(false); // Add this line
  const [jugadorExtendido, setJugadorExtendido] =
    useState<JugadorConEquipo | null>(null);

  const esJugador = usuario?.rol_id === 5;

  useEffect(() => {
    if (!usuario || !esJugador) return;

    const cargarDatos = async () => {
      setIsLoading(true);
      const { data, error } =
        await jugadorExtendidoService.getJugadorExtendidoPorId(usuario.id);

      if (!error && data) {
        setJugadorExtendido(data);
        console.log(data);
        if (data.equipo_id) {
          setPermitirInscripcion(false);
          setMensajeBolsa(
            'Ya perteneces a un equipo. No puedes inscribirte en la bolsa.'
          );
        } else if (data.esta_en_bolsa) {
          setPermitirInscripcion(false);
          setMensajeBolsa('Ya estás inscrito en la bolsa de jugadores.');
        } else {
          setPermitirInscripcion(true);
          setMensajeBolsa(null);
        }
      }

      setIsLoading(false);
    };

    cargarDatos();
  }, [usuario, esJugador]);

  const handleInscripcion = async () => {
    if (!usuario || !esJugador) return;

    const { data, error, mensaje } =
      await bolsaJugadoresService.inscribirseEnBolsa(usuario.id);

    if (!error && data) {
      setPermitirInscripcion(false);
      setMensajeBolsa('Ya estás inscrito en la bolsa de jugadores.');
    } else {
      console.error(mensaje || 'Error al inscribirse en la bolsa');
    }
  };

  const handleDesinscripcion = async () => {
    if (!usuario || !esJugador) return;

    const { error, mensaje } = await bolsaJugadoresService.cancelarInscripcion(
      usuario.id
    );

    if (!error) {
      setPermitirInscripcion(true);
      setMensajeBolsa(null);
    } else {
      console.error(mensaje || 'Error al desinscribirse de la bolsa');
    }
  };

  if (loading || isLoading) {
    return <StyledActivityIndicator message='Cargando información...' />;
  }

  if (!usuario) return null;

  return (
    <ScrollView style={{ flex: 1 }}>
      <PerfilCard usuario={usuario} jugadorExtendido={jugadorExtendido} />

      {usuario.rol_id === 6 && (
        <StyledButton
          title='Editar Perfil'
          onPress={() => router.push('editar-perfil')}
        />
      )}

      {esJugador && (
        <>
          {permitirInscripcion ? (
            <StyledButton
              title='Inscribirme a la Bolsa de Jugadores'
              onPress={handleInscripcion}
            />
          ) : jugadorExtendido?.esta_en_bolsa ? (
            <>
              <StyledButton
                variant='outline-danger'
                title='Desinscribirme de la Bolsa'
                onPress={() => setShowModal(true)}
              />
              <StyledModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                  handleDesinscripcion();
                  setShowModal(false);
                }}
                title='Confirmar desinscripción'
              >
                <StyledText>
                  ¿Estás seguro de que deseas desinscribirte de la bolsa de
                  jugadores? Esta acción rechazará todas las solicitudes
                  pendientes.
                </StyledText>
              </StyledModal>
            </>
          ) : mensajeBolsa ? (
            <StyledAlert variant='info'>
              <StyledText style={{ color: theme.info }}>
                {mensajeBolsa}
              </StyledText>
            </StyledAlert>
          ) : null}
        </>
      )}

      <StyledButton variant='danger' title='Cerrar Sesión' onPress={logout} />
    </ScrollView>
  );
}
