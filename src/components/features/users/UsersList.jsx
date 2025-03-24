import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import StyledText from '../../common/StyledText';
import { getManageableUsers } from '../../../services/userService';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useTheme } from '../../../hooks/theme/useTheme';
import UserCard from './UserCard';

const UsersList = ({ filterRole = 'All Users' }) => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getManageableUsers(userData?.role);
        if (response) {
          setUsers(response);
        } else {
          setError('No data received from server');
          console.error('No data in response:', response);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={listStyles.listContainer}>
        <StyledText>Cargando usuarios...</StyledText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={listStyles.listContainer}>
        <StyledText>Error: {error}</StyledText>
      </View>
    );
  }

  return (
    <View style={listStyles.container}>
      <ScrollView style={listStyles.listContainer}>
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.uid} user={user} />)
        ) : (
          <StyledText>No hay usuarios que mostrar todavía</StyledText>
        )}
      </ScrollView>
    </View>
  );
};

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    width: Platform.OS === 'web' ? '50%' : '100%',
    marginHorizontal: 'auto',
  },
});

export default UsersList;
