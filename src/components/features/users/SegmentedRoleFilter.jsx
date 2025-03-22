import React from 'react';
import SegmentedButtons from '../../common/SegmentedButtons';
import { useAuth } from '../../../hooks/auth/useAuth';

export default function SegmentedRoleFilter({ selectedRole, onRoleChange }) {
  const { userData } = useAuth();
  const roleOptions = [
    { label: 'All', value: 'all' },
    { label: 'Jugador', value: 'jugador' },
    { label: 'Capitán', value: 'capitan' },
    { label: 'Espectador', value: 'espectador' },
  ];
  if (userData.role === 'organizador') {
    roleOptions.push({ label: 'Co-Organizador', value: 'co-organizador' });
  }

  return (
    <SegmentedButtons
      options={roleOptions}
      selectedValue={selectedRole}
      onValueChange={onRoleChange}
    />
  );
}
