import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { useTheme } from '../../context/ThemeContext';

interface StyledAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export default function StyledAlert({ type, message }: StyledAlertProps) {
  const { theme } = useTheme();

  const getAlertStyle = () => {
    const styles = {
      success: { backgroundColor: theme.success + '20', borderColor: theme.success },
      error: { backgroundColor: theme.error + '20', borderColor: theme.error },
      warning: { backgroundColor: theme.warning + '20', borderColor: theme.warning },
      info: { backgroundColor: theme.info + '20', borderColor: theme.info },
    };
    return styles[type];
  };

  return (
    <View style={[styles.container, getAlertStyle()]}>
      <StyledText style={{ color: getAlertStyle().borderColor }}>
        {message}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
});