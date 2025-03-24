import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../src/hooks/theme/useTheme';
import UserAccessLinks from '../../src/components/features/access/UserAccessLinks';
import { useAuth } from '../../src/hooks/auth/useAuth'; // Asumiendo que tienes un hook de autenticación

export default function Mas() {
  const { theme } = useTheme();
  const { user, userData } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <UserAccessLinks userRole={userData?.role} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
