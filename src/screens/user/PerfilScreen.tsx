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
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function PerfilScreen() {
  const { logout } = useAuth();
  const { theme } = useThemeContext();
  const { usuario, loading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [permitirInscripcion, setPermitirInscripcion] =
    useState<boolean>(false);

  useEffect(() => {
    if (!usuario) return;

    if (!isJugador(usuario)) {
      setIsLoading(false);
      return;
    }
    const fetchBolsaInscripcion = async () => {
      try {
        setIsLoading(true);
        const { data, error, mensaje } =
          await bolsaJugadoresService.getJugadorEnBolsaById(usuario.usuario_id);

        if (error || !data) {
          throw new Error(mensaje || 'Error al obtener datos del jugador');
        }
        setPermitirInscripcion(false);
        setIsLoading(false);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('Jugador no encontrado')
        ) {
          setPermitirInscripcion(true);
        }
        setIsLoading(false);
      }
    };
    fetchBolsaInscripcion();
  }, [usuario]);

  const handleInscripcion = async () => {
    const esJugador = usuario && isJugador(usuario);
    console.log(esJugador);
    if (!esJugador) return;
    const { data, error, mensaje } =
      await bolsaJugadoresService.inscribirseEnBolsa(usuario.usuario_id);

    if (error || !data) {
      console.error(mensaje || 'Error al inscribirse en la bolsa');
      return;
    }
    setPermitirInscripcion(false);
  };
  if (loading || isLoading) {
    return <StyledActivityIndicator message='Cargando informacion...' />;
  }
  console.log(JSON.stringify(usuario));
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <PerfilCard usuario={usuario} />
      {usuario?.rol_id === 6 && (
        <StyledButton
          variant='default'
          title='Editar Perfil'
          onPress={() => router.push('editar-perfil')}
        />
      )}
      {usuario?.rol_id === 5 ? (
        permitirInscripcion ? (
          <StyledButton
            variant='default'
            title='Inscribirme a la Bolsa de Jugadores'
            onPress={() => handleInscripcion()}
          />
        ) : (
          <StyledAlert variant='info'>
            <StyledText style={{ color: theme.info }}>
              Ya estás inscrito en la bolsa de jugadores
            </StyledText>
          </StyledAlert>
        )
      ) : null}

      <StyledButton variant='danger' title='Cerrar Sesión' onPress={logout} />
    </ScrollView>
  );
}
