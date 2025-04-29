import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledButton from '@/src/components/common/StyledButton';
import PerfilCard from '@/src/components/user/userInfo';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserContext } from '@/src/contexts/UserContext';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function PerfilScreen() {
  const { logout } = useAuth();
  const { usuario, loading } = useUserContext();

  if (loading) {
    return <StyledActivityIndicator message='Cargando informacion...' />;
  }
  console.log(usuario);
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
      <StyledButton variant='danger' title='Cerrar Sesión' onPress={logout} />
    </ScrollView>
  );
}
