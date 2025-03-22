import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useField } from 'formik';
import UniversalPicker from '../pickers/UniversalPicker';
import { colors } from '../../../theme/colors';
import StyledText from '../../common/StyledText';

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
      {hasError && (
        <StyledText style={styles.errorText}>{meta.error}</StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '75%',
    alignSelf: 'center',
  },
  errorText: {
    color: colors.errorText,
    fontSize: 12,
    marginLeft: 14,
    marginTop: 2,
  },
});
