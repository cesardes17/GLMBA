import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/PageContainer';

import StyledText from '../components/common/StyledText';

export default function SolicitudesScreen() {
  return (
    <PageContainer>
      <View style={styles.container}>
        <StyledText>Solicitudes Screen</StyledText>
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
