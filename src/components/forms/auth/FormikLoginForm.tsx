import { Formik } from 'formik';
import FormikTextInput from '../inputs/FomrikTextInput';
import { loginSchema } from '@/src/schemas/auth';
import { View } from 'react-native';
import StyledButton from '../../common/StyledButton';
import Separator from '../../common/Separator';

interface FormikLoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export default function FormikLoginForm({ onSubmit }: FormikLoginFormProps) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      validateOnChange
      validateOnBlur
      onSubmit={(values) => onSubmit(values.email, values.password)}
    >
      {({ handleSubmit, isSubmitting }) => (
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
            secureTextEntry
            autoCapitalize='none'
            textContentType='password'
          />
          <StyledButton
            title='Iniciar sesión'
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
          <Separator />
        </View>
      )}
    </Formik>
  );
}
