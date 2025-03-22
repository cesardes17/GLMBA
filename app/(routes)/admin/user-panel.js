import React from 'react';
import UserPanelScreen from '../../../src/screens/admin/UserPanelScreen';
import WebBackHeader from '../../../src/components/navigation/WebBackHeader';

export default function UserPanel() {
  return (
    <>
      <WebBackHeader title={'Panel de Usuarios'} />
      <UserPanelScreen />
    </>
  );
}
