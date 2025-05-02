import { View, StyleSheet } from 'react-native';

import StyledText from '../common/StyledText';

import { Usuario } from '@/src/interfaces/Usuario';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { getRolesArray } from '@/src/constants/roles';
import { EmailIcon, RolIcon, UserIcon } from '../Icons';

interface EspectadorCardProps {
  usuario: Usuario;
}

export default function UsuarioCard({ usuario }: EspectadorCardProps) {
  const { theme } = useThemeContext();

  const roles = getRolesArray();
  const rol = roles.find((rol) => rol.id === usuario!.rol_id)?.nombre || '';
  return (
    <View style={styles.container}>
      <StyledText style={[styles.title, { color: theme.textPrimary }]}>
        Información del Usuario:
      </StyledText>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <UserIcon size={20} color={theme.textPrimary} />

        <StyledText style={{ color: theme.textPrimary }}>
          {usuario.nombre + ' ' + usuario.apellidos}
        </StyledText>
      </View>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <EmailIcon size={20} color={theme.textPrimary} />
        <StyledText style={{ color: theme.textPrimary }}>
          {usuario.email}
        </StyledText>
      </View>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <RolIcon size={20} color={theme.textPrimary} />
        <StyledText style={{ color: theme.textPrimary }}>{rol}</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
});
