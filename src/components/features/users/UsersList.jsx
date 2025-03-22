import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getManageableUsers } from '../../../services/api/userService';
import { useAuth } from '../../../hooks/auth/useAuth';
import StyledText from '../../common/StyledText';
import UserCard from './UserCard';
import SegmentedRoleFilter from './SegmentedRoleFilter';
import { useTheme } from '../../../hooks/theme/useTheme';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      loadUsers();
    }
  }, [userData]);

  const loadUsers = async () => {
    if (!userData) return;

    try {
      const usersData = await getManageableUsers(userData.role);
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterUsers();
  }, [selectedRole, users]);

  const filterUsers = () => {
    if (selectedRole === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === selectedRole));
    }
  };

  if (loading) {
    return <StyledText>Loading users...</StyledText>;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.filterContainer, { backgroundColor: theme.background }]}
      >
        <SegmentedRoleFilter
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 80, // Add padding to account for the fixed filter
  },
});
