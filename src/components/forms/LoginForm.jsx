import React, { useState } from "react";
import { Formik } from "formik";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import FormikInputValue from "../formik/FormikInputValue";
import { loginSchema } from "../../schemas/ValidationSchemas";
import { login } from "../../servicies/firebase/authService";
import StyledButton from "../StyledButton";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(""); // Estado para errores de autenticación

  const handleLogin = async (values) => {
    setLoading(true);
    setAuthError("");
    try {
      await login(values.email, values.password);
    } catch (error) {
      setAuthError(error.message);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={styles.container}>
          <FormikInputValue name="email" placeholder="Correo electrónico" />
          <FormikInputValue
            name="password"
            placeholder="Contraseña"
            secureTextEntry
          />

          {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

          {loading ? (
            <ActivityIndicator size="large" color="#05C484" />
          ) : (
            <StyledButton
              title="Iniciar sesión"
              onPress={handleSubmit}
              disabled={!isValid || !dirty}
            />
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});
