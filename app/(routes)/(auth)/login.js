import React from 'react';
import WebBackHeader from '../../../src/components/navigation/WebBackHeader';
import LoginScreen from '../../../src/screens/LoginScreen';

export default function Login() {
  return (
    <>
      <WebBackHeader title={'Inicia Sesión'} />
      <LoginScreen />
    </>
  );
}
