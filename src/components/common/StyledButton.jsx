import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import StyledText from './StyledText';
import { useTheme } from '../../hooks/theme/useTheme';

export default function StyledButton({
  title,
  icon,
  onPress,
  disabled = false,
  danger = false,
  style = {},
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabledButton,
        danger ? styles.dangerButton : styles.defaultButton,
        pressed && styles.pressedButton,
        style,
      ]}
    >
      {icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : (
        <StyledText
          style={[
            styles.text,
            { color: theme.buttonTextColor },
            disabled && styles.disabledText,
            danger && styles.dangerText,
          ]}
        >
          {title}
        </StyledText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    maxWidth: 250,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#000',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  defaultButton: {
    backgroundColor: colors.color200,
  },
  pressedButton: {
    opacity: 0.7, // 🔹 Reduce opacidad al presionar
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  disabledButton: {
    backgroundColor: colors.color100,
    borderColor: colors.color300,
  },
  disabledText: {
    color: colors.color400,
  },
  dangerButton: {
    backgroundColor: 'red',
    borderColor: '#000',
  },
  dangerText: {
    color: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
