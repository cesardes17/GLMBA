import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../inputs/FomrikTextInput';
import StyledButton from '../../common/StyledButton';
import { registroSchema } from '../../../schemas/auth';
import { router } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import Separator from '../../common/Separator';

interface FormikRegistroFormProps {
  setIsLoading: (loading: boolean) => void;
}

export default function FormikRegistroForm({
  setIsLoading,
}: FormikRegistroFormProps) {
  const { register } = useAuth();
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      console.log(values);
      await register(values.email, values.password);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.replace('/');
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registroSchema}
      >
        {({ handleSubmit }) => (
          <View style={{ paddingHorizontal: 16 }}>
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
            <FormikTextInput
              name='confirmPassword'
              placeholder='Confirma tu contraseña'
              secureTextEntry={true}
              autoComplete='off'
              autoCapitalize='none'
              textContentType='oneTimeCode' // This prevents the password suggestion
            />
            <StyledButton title='Registrarse' onPress={handleSubmit} />
            <Separator />
          </View>
        )}
      </Formik>
    </>
  );
}
