import React from "react";
import StyledTextInput from "../StyledTextInput";
import { useField } from "formik";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../theme/colors";

export default function FormikInputValue({ name, ...props }) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error; // Detecta si hay un error y si el usuario tocó el campo

  return (
    <View style={{ marginBottom: 10 }}>
      <StyledTextInput
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)} // Marca el campo como tocado
        error={hasError} // Pasar el error a StyledTextInput
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.errorText,
    fontSize: 12,
    marginLeft: 14,
    marginTop: 4,
  },
});
