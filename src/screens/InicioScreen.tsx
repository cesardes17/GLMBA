import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/PageContainer';
import StyledText from '@/src/components/common/StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';
// import StyledButton from '../components/common/StyledButton';
// import { useAuth } from '../contexts/AuthContext';

export default function InicioScreen() {
  const { theme } = useThemeContext();
  // const { logout } = useAuth();

  return (
    <PageContainer>
      <View style={styles.container}>
        <StyledText
          style={[styles.title, { color: theme.textPrimary }]}
          size='large'
          weight='bold'
        >
          Bienvenido a GLMBA
        </StyledText>
      </View>
      {/* <StyledButton
        variant='danger'
        title='Cerrar Sesión'
        onPress={() => logout()}
      /> */}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
  },
});
