import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/layout/Screen';
import UsersList from '../../components/UsersList';

const UserPanelScreen = () => {
  return (
    <Screen style={styles.container}>
      <UsersList />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserPanelScreen;
