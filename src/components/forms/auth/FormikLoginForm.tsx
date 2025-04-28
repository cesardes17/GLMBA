import { Formik } from 'formik';
import FormikTextInput from '../inputs/FomrikTextInput';
import { loginSchema } from '@/src/schemas/auth';
import { View } from 'react-native';
import StyledButton from '../../common/StyledButton';
import Separator from '../../common/Separator';

const initialValues = {
  email: '',
  password: '',
};

export default function FormikLoginForm() {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginSchema}
    >
      {({ handleSubmit }) => (
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          <FormikTextInput
            name='email'
            placeholder='Introduce tu email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          <FormikTextInput
            name='password'
            placeholder='Introduce tu contraseña'
            secureTextEntry={true}
            autoComplete='off'
            autoCapitalize='none'
            textContentType='oneTimeCode' // This prevents the password suggestion
          />
          <StyledButton title='Iniciar sesión' onPress={handleSubmit} />
          <Separator />
        </View>
      )}
    </Formik>
  );
}
