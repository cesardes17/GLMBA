import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const StyledTextInput = ({ style = {}, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false); // Estado para el foco

  return (
    <TextInput
      style={[
        styles.input,
        isFocused && styles.focused, // Aplica estilos de enfoque
        error && styles.error, // Aplica estilos de error
        style,
      ]}
      onFocus={() => setIsFocused(true)} // Se activa cuando el input obtiene el foco
      onBlur={() => setIsFocused(false)} // Se desactiva cuando el input pierde el foco
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
    backgroundColor: colors.color200, // Color cuando el input está enfocado
    borderColor: colors.color600, // Resalta el borde en foco
  },
  error: {
    borderColor: colors.errorStrong, // Color del borde
    backgroundColor: colors.errorLight, // Color de fondo
    color: colors.errorText, // Color del texto
  },
});

export default StyledTextInput;
