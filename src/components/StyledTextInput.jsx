import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const StyledTextInput = ({ style = {}, error, isFocused, ...props }) => {
  return (
    <TextInput
      style={[
        styles.input,
        isFocused && styles.focused, // Estilos de foco
        error && styles.error, // Estilos de error
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: colors.color050,
    borderColor: colors.color950,
    color: colors.color950,
    minWidth: 250,
  },
  focused: {
    backgroundColor: colors.color200,
    borderColor: colors.color600,
  },
  error: {
    borderColor: colors.errorStrong,
    backgroundColor: colors.errorLight,
    color: colors.errorText,
  },
});

export default StyledTextInput;
