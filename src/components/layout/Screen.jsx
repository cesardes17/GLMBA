import { useTheme } from '../../hooks/theme/useTheme';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function Screen({ children, style }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
