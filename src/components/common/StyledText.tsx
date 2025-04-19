import React from "react";
import {
  Text,
  TextStyle,
  TextProps,
  StyleSheet,
  StyleProp,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface StyledTextProps extends Omit<TextProps, "style"> {
  variant?: "primary" | "secondary" | "disabled";
  size?: "small" | "medium" | "large";
  weight?: "regular" | "medium" | "bold";
  style?: StyleProp<TextStyle>;
}

export default function StyledText({
  style,
  children,
  variant = "primary",
  size = "medium",
  weight = "regular",
  ...rest
}: StyledTextProps) {
  const { theme } = useTheme();

  const variantStyle: TextStyle = {
    color:
      variant === "primary"
        ? theme.textPrimary
        : variant === "secondary"
          ? theme.textSecondary
          : theme.textDisabled,
  };

  const sizeStyle: TextStyle = {
    fontSize: size === "small" ? 12 : size === "large" ? 20 : 16,
  };

  const weightStyle: TextStyle = {
    fontWeight: weight === "bold" ? "700" : weight === "medium" ? "500" : "400",
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

const styles = StyleSheet.create({});
