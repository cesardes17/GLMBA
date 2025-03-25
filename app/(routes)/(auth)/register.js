import React from 'react';
import WebBackHeader from '../../../src/components/navigation/WebBackHeader';
import RegisterScreen from '../../../src/screens/RegisterScreen';

export default function Register() {
  return (
    <>
      <WebBackHeader title={'Crea una cuenta'} />

      <RegisterScreen />
    </>
  );
}
