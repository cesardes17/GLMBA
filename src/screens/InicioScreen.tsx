import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/PageContainer';
import StyledText from '@/src/components/common/StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';

export default function InicioScreen() {
  const { theme } = useThemeContext();

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
