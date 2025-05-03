import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledButton from '@/src/components/common/StyledButton';
import StyledText from '@/src/components/common/StyledText';
import PerfilCard from '@/src/components/user/userInfo';

import { useAuth } from '@/src/contexts/AuthContext';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { isJugador } from '@/src/interfaces/Jugador';
import { bolsaJugadoresService } from '@/src/service/bolsaJugadoresService';
import { jugadorExtendidoService } from '@/src/service/jugadorExtendidoService';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

export default function PerfilScreen() {
  const { logout } = useAuth();
  const { theme } = useThemeContext();
  const { usuario, loading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [mensajeBolsa, setMensajeBolsa] = useState<string | null>(null);
  const [permitirInscripcion, setPermitirInscripcion] = useState(false);
  const [jugadorExtendido, setJugadorExtendido] = useState<any>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!usuario || !isJugador(usuario)) return;

      setIsLoading(true);
      const { data, error } =
        await jugadorExtendidoService.getJugadorExtendidoPorId(
          usuario.usuario_id
        );
      if (data && !error) {
        setJugadorExtendido(data);

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
  }, [usuario]);

  const handleInscripcion = async () => {
    if (!usuario || !isJugador(usuario)) return;

    const { data, error, mensaje } =
      await bolsaJugadoresService.inscribirseEnBolsa(usuario.usuario_id);
    if (!error && data) {
      setPermitirInscripcion(false);
      setMensajeBolsa('Ya estás inscrito en la bolsa de jugadores.');
    }
  };

  if (loading || isLoading) {
    return <StyledActivityIndicator message='Cargando información...' />;
  }
  if (!usuario) {
    return;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <PerfilCard usuario={usuario} jugadorExtendido={jugadorExtendido} />

      {usuario?.rol_id === 6 && (
        <StyledButton
          title='Editar Perfil'
          onPress={() => router.push('editar-perfil')}
        />
      )}

      {usuario?.rol_id === 5 && (
        <>
          {permitirInscripcion ? (
            <StyledButton
              title='Inscribirme a la Bolsa de Jugadores'
              onPress={handleInscripcion}
            />
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
