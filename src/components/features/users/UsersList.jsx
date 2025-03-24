import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from '../../common/StyledText';
import FilterCarousel from '../../common/FilterCarousel';

const UsersList = () => {
  const roles = [
    'All Users',
    'Admin',
    'Teacher',
    'Student',
    'Parent',
    'Staff',
    'Guest',
  ];
  const [selectedRole, setSelectedRole] = useState('All Users');

  return (
    <View style={styles.container}>
      <FilterCarousel
        filters={roles}
        onFilterChange={setSelectedRole}
        initialFilter="All Users"
      />

      <View style={styles.listContainer}>
        <StyledText> Rol seleccionado: {selectedRole}</StyledText>
        <StyledText> No hay usuarios que mostrar todavia!</StyledText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    height: '90%',
    paddingHorizontal: 16,
  },
});

export default UsersList;
