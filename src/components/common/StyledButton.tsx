import React, { useState } from 'react';
import { Pressable, StyleSheet, AccessibilityProps } from 'react-native';
import StyledText from './StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface StyledButtonProps
  extends Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'danger';
  size?: 'small' | 'default' | 'large';
}

export default function StyledButton({
  title,
  onPress,
  disabled = false,
  variant = 'default',
  size = 'default',
  accessibilityLabel,
  accessibilityHint,
}: StyledButtonProps) {
  const { theme } = useThemeContext();
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (disabled) return theme.button.disabled;
    if (variant === 'danger') {
      if (isPressed) return theme.button.dangerActive;
      return theme.button.danger;
    }
    if (isPressed) return theme.button.active;
    if (variant === 'outline') return theme.button.outline;
    return theme.button.default;
  };

  const buttonStyle = getButtonStyle();

  const sizeStyles = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      minWidth: 100,
    },
    default: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      minWidth: 150,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      minWidth: 200,
    },
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: buttonStyle.background,
          borderColor: buttonStyle.border,
          borderWidth: variant === 'outline' ? 2 : 1,
        },
        isPressed && !disabled && buttonStyle.shadow
          ? {
              shadowColor: buttonStyle.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }
          : null,
      ]}
    >
      <StyledText style={[styles.text, { color: buttonStyle.text }]}>
        {title}
      </StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
