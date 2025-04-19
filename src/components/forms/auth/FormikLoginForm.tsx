import React, { useState } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import StyledButton from "../../common/StyledButton";
import FormikTextInput from "../inputs/FormikTextInput";
import { loginSchema } from "../../../schemas/auth";
import { useUser } from "../../../context/UserContext";
import { router } from "expo-router";

interface FormikRegistroFormProps {
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export default function FormikLoginForm({
  setLoading,
  setError,
}: FormikRegistroFormProps) {
  const { login } = useUser();
  const [infoUser, setInfoUser] = useState<boolean>(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const { info, error } = await login(values.email, values.password);

      if (error) {
        throw error;
      }

      setError(null);
      setInfoUser(info);
      setLoading(false);

      // Move navigation inside try block, before finally
      const ruta = info ? "/(auth)/setup-profile" : "/";
      router.replace(ruta);
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ handleSubmit }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <FormikTextInput name="email" placeholder="Introduce tu email" />
            <FormikTextInput
              name="password"
              placeholder="Introduce tu contraseña"
              keyboardType="email-address"
              secureTextEntry={true}
              autoComplete="off"
            />

            <StyledButton title="Iniciar Sesión" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </>
  );
}
