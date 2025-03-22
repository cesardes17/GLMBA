// /src/screens/LoginScreen.jsx
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { useRouter } from 'expo-router';
import Separator from '../components/common/Separator';
import StyledButton from '../components/common/StyledButton';
import Screen from '../components/layout/Screen';
import { View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 'auto',
        }}
      >
        <LoginForm />
        <Separator marginVertical={20} />
        <StyledButton
          title={'Crea una Cuenta'}
          onPress={() => {
            router.replace('/register');
          }}
        />
      </View>
    </Screen>
  );
}
