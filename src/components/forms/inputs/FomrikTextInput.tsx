import React, { useState } from 'react';
import StyledTextInput from '../../common/StyledTextInput';
import StyledText from '../../common/StyledText';
import { useField } from 'formik';
import { TextInputProps, View } from 'react-native';

interface FormikTextInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string;
}

export default function FormikTextInput({
  name,
  ...props
}: FormikTextInputProps) {
  const [field, meta, helpers] = useField(name);
  const [isActive, setIsActive] = useState(false);

  const showError = meta.touched && !isActive && meta.error;

  return (
    <View>
      <StyledTextInput
        value={field.value}
        onChangeText={(value) => {
          helpers.setValue(value);
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
          helpers.setTouched(true);
        }}
        {...props}
        error={!!showError}
      />
      {showError ? (
        <StyledText
          style={{
            color: '#d32f2f',
            fontSize: 12,
            marginLeft: 16,
            marginTop: 4,
          }}
        >
          {meta.error}
        </StyledText>
      ) : null}
    </View>
  );
}
