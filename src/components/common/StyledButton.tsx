import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "default" | "hover" | "active" | "disabled";
}

export default function StyledButton({
  title,
  onPress,
  disabled = false,
  variant,
}: StyledButtonProps) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  // Determine which style to use based on props and state
  const buttonState =
    variant || (disabled ? "disabled" : isPressed ? "active" : "default");
  const buttonStyle = theme.button[buttonState];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: buttonStyle.background,
          borderColor: buttonStyle.border,
          borderWidth: 1,
          // Add shadow for active state
          ...(buttonState === "active" && {
            shadowColor:
              "shadow" in buttonStyle ? buttonStyle.shadow : buttonStyle.border,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: buttonStyle.text,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
