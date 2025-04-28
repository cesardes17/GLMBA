import { useThemeContext } from '@/src/contexts/ThemeContext';
import { View } from 'react-native';

export default function Separator() {
  const { theme } = useThemeContext();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.textPrimary, // Cambiar temporalmente para verificar visibilidad
        marginVertical: 12,
      }}
    />
  );
}
