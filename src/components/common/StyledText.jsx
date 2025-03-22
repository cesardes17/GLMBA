// /src/components/StyledText.js
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../hooks/theme/useTheme';

// Componente de texto que usa los estilos del tema
const StyledText = ({ children, style, ...props }) => {
  const { theme } = useTheme();

  return (
    <Text style={[styles.text, { color: theme.textColor }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default StyledText;
