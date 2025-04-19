import React, { useState } from "react";
import StyledTextInput from "../../common/StyledTextInput";
import { useField } from "formik";
import { TextInputProps } from "react-native";

interface FormikTextInputProps
  extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
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
      error={showError ? meta.error : undefined}
      {...props}
    />
  );
}
