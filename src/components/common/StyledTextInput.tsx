import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface StyledTextInputProps extends TextInputProps {
  error: string | undefined;
}

export default function StyledTextInput({
  error,
  editable = true,
  style,
  onBlur,
  onFocus,
  ...rest
}: StyledTextInputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getInputState = () => {
    if (!editable) return "disabled";
    if (error) return "error";
    if (isFocused) return "focused";
    return "default";
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputState = getInputState();
  const inputTheme = theme.input[inputState];

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: inputTheme.background,
            borderColor: inputTheme.border,
            color: inputTheme.text,
          },
          style,
        ]}
        placeholderTextColor={inputTheme.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        {...rest}
      />
      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    marginVertical: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    minWidth: "100%",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});
