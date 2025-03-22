import { Formik } from 'formik';
import { View, Alert } from 'react-native';
import FormikInputValue from '../formik/FormikInputValue';
import FormikPickerValue from '../formik/FormikPickerValue';
import { registrationSchema } from '../../schemas/ValidationSchemas';
import StyledButton from '../StyledButton';
import { registerUser } from '../../servicies/userService';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'espectador',
  jerseyNumber: '',
  height: '',
  favPosition: 'base',
};

const roleData = [
  { key: 'espectador', label: 'Espectador' },
  { key: 'jugador', label: 'Jugador' },
];

const positionData = [
  { key: 'base', label: 'Base' },
  { key: 'escolta', label: 'Escolta' },
  { key: 'alero', label: 'Alero' },
  { key: 'ala-pivot', label: 'Ala-Pívot' },
  { key: 'pivot', label: 'Pívot' },
];

export default function RegistrationForm() {
  const handleRegister = async (values, { resetForm }) => {
    try {
      const success = await registerUser(values);
      if (success) {
        Alert.alert(
          'Registro exitoso',
          'El usuario ha sido creado correctamente.'
        );
        resetForm(); // 🔹 Ahora sí se puede usar resetForm
      } else {
        Alert.alert('Error', 'No se pudo completar el registro.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={handleRegister} // 🔹 Ahora pasamos la función corregida
    >
      {({ handleSubmit, isValid, dirty, values }) => (
        <View>
          <FormikInputValue name="fullName" placeholder="Nombre completo" />
          <FormikInputValue name="email" placeholder="Correo electrónico" />
          <FormikInputValue
            name="password"
            placeholder="Contraseña"
            secureTextEntry
          />
          <FormikInputValue
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            secureTextEntry
          />

          {/* Selector de Rol */}
          <FormikPickerValue name="role" data={roleData} />

          {/* Mostrar estos campos solo si el usuario es "jugador" */}
          {values.role === 'jugador' && (
            <>
              <FormikInputValue
                name="jerseyNumber"
                placeholder="Número de Camiseta"
                keyboardType="numeric"
              />
              <FormikInputValue
                name="height"
                placeholder="Altura (cm)"
                keyboardType="numeric"
              />
              <FormikPickerValue name="favPosition" data={positionData} />
            </>
          )}

          <StyledButton
            title="Registrarse"
            onPress={handleSubmit}
            disabled={!isValid || !dirty}
            style={{ marginTop: 20 }}
          />
        </View>
      )}
    </Formik>
  );
}
