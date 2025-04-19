import React from "react";
import { Formik } from "formik";
import { View } from "react-native";
import StyledButton from "../../common/StyledButton";
import FormikTextInput from "../inputs/FormikTextInput";
import { registroSchema } from "../../../schemas/auth";
import { useUser } from "../../../context/UserContext";

interface FormikRegistroFormProps {
  setLoading: (loading: boolean) => void;
}

export default function FormikRegistroForm({
  setLoading,
}: FormikRegistroFormProps) {
  const { register } = useUser();

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    console.log("values: ", values);

    await register(values.email, values.password);
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={registroSchema}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <View style={{ paddingHorizontal: 16 }}>
            <FormikTextInput name="email" placeholder="Introduce tu email" />

            <FormikTextInput
              name="password"
              placeholder="Introduce tu contraseña"
              keyboardType="email-address"
              secureTextEntry={true}
              autoComplete="off"
            />
            <FormikTextInput
              name="confirmPassword"
              placeholder="Confirma tu contraseña"
              secureTextEntry={true}
              autoComplete="off"
            />

            <StyledButton title="Registrarse" onPress={handleSubmit} />
          </View>
        );
      }}
    </Formik>
  );
}
