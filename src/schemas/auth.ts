import * as Yup from 'yup';
import { PosicionPreferida } from '@/src/types/enums/Posicion';

const posicionPreferidaValues = Object.values(PosicionPreferida);

export const registroSchema = Yup.object().shape({
  email: Yup.string()
    .email('Introduce un email válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Introduce un email válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export const CompletarPerfilSchema = Yup.object().shape({
  rol_id: Yup.number().required('Debes seleccionar un rol'),
  nombre: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  apellidos: Yup.string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .required('Los apellidos son obligatorios'),

  posicion_preferida: Yup.string()
    .oneOf(posicionPreferidaValues, 'Posición no válida')
    .when('rol_id', {
      is: '5',
      then: (schema) => schema.required('La posición es obligatoria'),
      otherwise: (schema) => schema.optional(),
    }),

  altura_cm: Yup.number().when('rol_id', {
    is: '5',
    then: (schema) =>
      schema
        .min(100, 'La altura debe ser mayor a 100cm')
        .max(250, 'La altura debe ser menor a 250cm')
        .required('La altura es obligatoria'),
    otherwise: (schema) => schema.optional(),
  }),

  peso_kg: Yup.number().when('rol_id', {
    is: '5',
    then: (schema) =>
      schema
        .min(30, 'El peso debe ser mayor a 30kg')
        .max(200, 'El peso debe ser menor a 200kg')
        .required('El peso es obligatorio'),
    otherwise: (schema) => schema.optional(),
  }),

  dorsal_preferido: Yup.number().when('rol_id', {
    is: '5',
    then: (schema) =>
      schema
        .min(0, 'El dorsal debe ser mayor a 0')
        .max(99, 'El dorsal debe ser menor a 99')
        .required('El dorsal es obligatorio'),
    otherwise: (schema) => schema.optional(),
  }),

  descripcion: Yup.string().optional(),
});
