import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import StyledButton from "../../common/StyledButton";
import FormikTextInput from "../inputs/FormikTextInput";
import { loginSchema } from "../../../schemas/auth";
import { useUser } from "../../../context/UserContext";
import { router } from "expo-router";
import { isUsuario, Usuario } from "../../../types/usuario";

interface FormikRegistroFormProps {
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export default function FormikLoginForm({
  setLoading,
  setError,
}: FormikRegistroFormProps) {
  const { user, login } = useUser();
  const [userInfo, setUserInfo] = useState<
    null | { email: string; id: string } | Usuario
  >();
  const initialValues = {
    email: "",
    password: "",
  };
  useEffect(() => {}, [user]);
  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const error = await login(values.email, values.password);

      if (error) {
        setUserInfo(null);
        throw error;
      }

      setError(null);
      setLoading(false);

      router.replace("/");
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
