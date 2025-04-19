import React from "react";
import { Formik } from "formik";
import { View } from "react-native";
import StyledButton from "../../common/StyledButton";
import FormikTextInput from "../inputs/FormikTextInput";
import StyledToast from "../../common/StyledToast";
import { registroSchema } from "../../../schemas/auth";
import { useUser } from "../../../context/UserContext";
import { router } from "expo-router";

interface FormikRegistroFormProps {
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export default function FormikRegistroForm({
  setLoading,
  setError,
}: FormikRegistroFormProps) {
  const { register } = useUser();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const error = await register(values.email, values.password);

      if (error) {
        throw new Error(error.message);
      } else {
        setError(null);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Sleep for 1 second
      setLoading(false);
      router.replace("/");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registroSchema}
      >
        {({ handleChange, handleSubmit, values }) => (
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
        )}
      </Formik>
    </>
  );
}
