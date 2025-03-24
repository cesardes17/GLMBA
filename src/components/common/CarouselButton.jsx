import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import StyledText from './StyledText';
import { useTheme } from '../../hooks/theme/useTheme';

export default function CarouselButton({
  title,
  onPress,
  isActive = false,
  disabled = false,
  style = {},
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isActive && styles.activeButton,
        disabled && styles.disabledButton,
        pressed && styles.pressedButton,
        style,
      ]}
    >
      <StyledText
        style={[
          styles.text,
          isActive && styles.activeText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    maxWidth: 150,
    marginHorizontal: 4,
    backgroundColor: colors.color100,
    borderWidth: 1,
    borderColor: colors.color300,
  },
  activeButton: {
    backgroundColor: colors.color300,
    transform: [{ scale: 1.05 }],
    borderColor: colors.color400,
  },
  pressedButton: {
    opacity: 0.8,
  },
  text: {
    fontSize: 14,
    color: colors.color700,
  },
  activeText: {
    color: colors.color900,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.color50,
    borderColor: colors.color200,
  },
  disabledText: {
    color: colors.color400,
  },
});