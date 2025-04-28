import { useThemeContext } from '@/src/contexts/ThemeContext';
import React from 'react';

import { Text, TextStyle, TextProps, StyleProp } from 'react-native';

interface StyledTextProps extends Omit<TextProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  weight?: 'regular' | 'medium' | 'bold';
  style?: StyleProp<TextStyle>;
}

export default function StyledText({
  style,
  children,
  variant = 'primary',
  size = 'medium',
  weight = 'regular',
  ...rest
}: StyledTextProps) {
  const { theme } = useThemeContext();

  const variantStyle: TextStyle = {
    color:
      variant === 'primary'
        ? theme.textPrimary
        : variant === 'secondary'
          ? theme.textSecondary
          : theme.textDisabled,
  };

  const sizeStyle: TextStyle = {
    fontSize: size === 'small' ? 12 : size === 'large' ? 20 : 16,
  };

  const weightStyle: TextStyle = {
    fontWeight: weight === 'bold' ? '700' : weight === 'medium' ? '500' : '400',
  };

  const mergedStyle: StyleProp<TextStyle> = [
    variantStyle,
    sizeStyle,
    weightStyle,
    style,
  ];

  return (
    <Text style={mergedStyle} {...rest}>
      {children}
    </Text>
  );
}
