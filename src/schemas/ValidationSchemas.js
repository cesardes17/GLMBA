import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico no válido')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export const registrationSchema = Yup.object().shape({
  fullName: Yup.string().required('El nombre completo es obligatorio'),
  email: Yup.string()
    .email('Correo no válido')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
  role: Yup.string().required('Selecciona un rol'),
  profileImage: Yup.string().nullable(),
  // Conditional validation for player fields
  jerseyNumber: Yup.string().when('role', {
    is: 'jugador',
    then: () =>
      Yup.string()
        .matches(/^[0-9]+$/, 'Solo números permitidos')
        .min(1, 'Mínimo 1 dígito')
        .max(2, 'Máximo 2 dígitos')
        .required('Número de camiseta requerido'),
  }),
  height: Yup.string().when('role', {
    is: 'jugador',
    then: () =>
      Yup.string()
        .matches(/^[0-9]+$/, 'Solo números permitidos')
        .min(2, 'Altura no válida')
        .max(3, 'Altura no válida')
        .required('Altura requerida'),
  }),
  favPosition: Yup.string().when('role', {
    is: 'jugador',
    then: () => Yup.string().required('Posición requerida'),
  }),
});
