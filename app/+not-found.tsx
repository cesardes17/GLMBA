import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import StyledText from '@/src/components/common/StyledText';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';

export default function NotFoundScreen() {
  const { theme } = useThemeContext();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <HeaderConfig title='Pagina No Encontrada' />
      <StyledText
        variant='primary'
        style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}
      >
        Pagina no encontrada
      </StyledText>
      <StyledText variant='secondary'>Error 404</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
