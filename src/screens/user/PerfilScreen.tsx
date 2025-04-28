import StyledText from '@/src/components/common/StyledText';
import { useAuth } from '@/src/contexts/AuthContext';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const { logout } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText>PerfilScreen</StyledText>

      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 12 }}
        onPress={async () => {
          console.log('cerrando sesion');
          await logout();
          router.replace('/');
        }}
      >
        <StyledText
          style={{
            color: 'white',
          }}
        >
          Cerrar Sesión
        </StyledText>
      </TouchableOpacity>
    </View>
  );
}
