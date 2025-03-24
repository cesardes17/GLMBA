import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/layout/Screen';
import UsersList from '../../components/features/users/UsersList';
import FilterCarousel from '../../components/common/FilterCarousel';

const UserPanelScreen = () => {
  const roles = [
    'All Users',
    'Admin',
    'Teacher',
    'Student',
    'Parent',
    'Staff',
    'Guest',
  ];
  const [selectedRole, setSelectedRole] = React.useState('All Users');
  return (
    <Screen style={styles.container}>
      <FilterCarousel
        filters={roles}
        onFilterChange={setSelectedRole}
        initialFilter="All Users"
      />
      <UsersList filterRole={selectedRole} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default UserPanelScreen;
