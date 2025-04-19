import * as Yup from "yup";

export const registroSchema = Yup.object().shape({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});
