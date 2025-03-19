import React, { useState } from "react";
import StyledTextInput from "../StyledTextInput";
import { useField } from "formik";
import { StyleSheet, View } from "react-native";
import { colors } from "../../theme/colors";
import StyledText from "../StyledText";

export default function FormikInputValue({ name, ...props }) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error; // Detecta si hay un error y si el usuario tocó el campo
  const [isFocused, setIsFocused] = useState(false); // Manejo de foco

  return (
    <View style={{ marginBottom: 10 }}>
      <StyledTextInput
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onFocus={() => setIsFocused(true)} // Activa el foco
        onBlur={() => {
          setIsFocused(false); // Desactiva el foco
          helpers.setTouched(true); // Marca como tocado en Formik
        }}
        error={hasError}
        isFocused={isFocused} // Pasamos el estado de foco
        {...props}
      />
      {hasError && (
        <StyledText style={styles.errorText}>{meta.error}</StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.errorText,
    fontSize: 12,
    marginLeft: 14,
    marginTop: 0,
  },
});
