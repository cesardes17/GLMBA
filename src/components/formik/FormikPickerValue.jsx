import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useField } from "formik";
import UniversalPicker from "../UniversalPicker";
import { colors } from "../../theme/colors";

export default function FormikPickerValue({
  name,
  data,
  initialValue,
  ...props
}) {
  const [field, meta, helpers] = useField(name);
  field.value = field.value || initialValue; // Si no hay valor, asigna el valor inicial
  const hasError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <UniversalPicker
        data={data}
        selectedValue={field.value}
        onValueChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)} // Marca el campo como tocado
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  errorText: {
    color: colors.errorText,
    fontSize: 12,
    marginLeft: 14,
    marginTop: 2,
  },
});
