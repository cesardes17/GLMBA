import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/layout/Screen';
import StyledText from '../../components/StyledText';

const UserPanelScreen = () => {
  return (
    <Screen style={styles.container}>
      <StyledText style={styles.text}>User Panel</StyledText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserPanelScreen;
