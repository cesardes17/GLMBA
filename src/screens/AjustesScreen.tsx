import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/PageContainer';
import ThemeSelector from '@/src/components/settings/ThemeSelector';

export default function AjustesScreen() {
  return (
    <PageContainer>
      <View style={styles.container}>
        <ThemeSelector />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
