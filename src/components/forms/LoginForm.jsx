import React, { useState } from "react";
import { Formik } from "formik";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import FormikInputValue from "../formik/FormikInputValue";
import { loginSchema } from "../../schemas/ValidationSchemas";
import { login } from "../../servicies/firebase/authService";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(""); // Estado para errores de autenticación

  const handleLogin = async (values) => {
    setLoading(true);
    setAuthError(""); // Limpiar errores previos
    try {
      await login(values.email, values.password);
    } catch (error) {
      setAuthError(error.message); // Guardar mensaje de error
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikInputValue name="email" placeholder="Correo electrónico" />
          <FormikInputValue
            name="password"
            placeholder="Contraseña"
            secureTextEntry
          />

          {/* 🔹 Mostrar errores de autenticación */}
          {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

          {/* 🔹 Botón de inicio de sesión con estado de carga */}
          {loading ? (
            <ActivityIndicator size="large" color="#05C484" />
          ) : (
            <Button
              title="Iniciar sesión"
              onPress={handleSubmit}
              disabled={loading}
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
