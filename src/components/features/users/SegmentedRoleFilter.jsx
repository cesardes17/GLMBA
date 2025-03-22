import React from 'react';
import SegmentedButtons from '../../common/SegmentedButtons';

export default function SegmentedRoleFilter({ selectedRole, onRoleChange }) {
  const roleOptions = [
    { label: 'All', value: 'all' },
    { label: 'Co-Organizador', value: 'co-organizador' },
    { label: 'Jugador', value: 'jugador' },
    { label: 'Capitán', value: 'capitan' },
    { label: 'Espectador', value: 'espectador' },
  ];

  return (
    <SegmentedButtons
      options={roleOptions}
      selectedValue={selectedRole}
      onValueChange={onRoleChange}
    />
  );
}
