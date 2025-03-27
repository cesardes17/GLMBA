import { Formik } from 'formik';
import { View, Alert } from 'react-native';
import FormikInputValue from './inputs/FormikInputValue';
import FormikPickerValue from './inputs/FormikPickerValue';
// import FormikImagePicker from './inputs/FormikImagePicker';
import { registrationSchema } from '../../schemas/ValidationSchemas';
import StyledButton from '../common/StyledButton';
import { setUserData } from '../../services/userService';
import { registerUser } from '../../services/authService';
import { router } from 'expo-router';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'espectador',
  jerseyNumber: '',
  height: '',
  favPosition: 'base',
  profileImage: null,
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
      console.log('Form values:', values);
      const user = await registerUser(values.email, values.password);
      if (!user) {
        throw new Error('Error al crear la cuenta');
      }
      console.log('User registered:', user);
      const userData = {
        uid: user.uid,
        fullName: values.fullName,
        email: values.email,
        role: values.role,
        ...(values.role === 'jugador' && {
          jerseyNumber: values.jerseyNumber,
          height: values.height,
          favPosition: values.favPosition,
        }),
      };
      console.log('User data:', userData);
      const res = await setUserData(userData);
      console.log('User data saved:', res);
      // Guardar en Realtime Database

      console.log('Registration response:', repsonse);
      Alert.alert(
        'Registro exitoso',
        'El usuario ha sido creado correctamente.'
      );
      router.push('/');
      resetForm();
      // // Step 2: Create user account
      // const userId = await registerUser(values);
      // if (!userId) {
      //   throw new Error('Error al crear la cuenta');
      // }

      // // Step 3: Save user data in Realtime Database
      // const userData = {
      //   fullName: values.fullName,
      //   email: values.email,
      //   role: values.role,
      //   profileImage: profileImageUrl,
      //   ...(values.role === 'jugador' && {
      //     jerseyNumber: values.jerseyNumber,
      //     height: values.height,
      //     favPosition: values.favPosition,
      //   }),
      // };

      // await saveUserData(userId, userData);

      // Alert.alert(
      //   'Registro exitoso',
      //   'El usuario ha sido creado correctamente.'
      // );
      // resetForm();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={handleRegister}
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
