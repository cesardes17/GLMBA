import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import StyledText from './StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface LoadingIndicatorProps {
  message?: string;
}

export default function StyledActivityIndicator({
  message = 'Cargando...',
}: LoadingIndicatorProps) {
  const { theme } = useThemeContext();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <StyledText style={[styles.text]}>{message}</StyledText>
      <ActivityIndicator size='large' color={theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
});
