import React from 'react';
import Screen from '../src/components/layout/Screen';
import StyledText from '../src/components/common/StyledText';

export default function NotFound() {
  return (
    <Screen>
      <StyledText>Error 404</StyledText>
      <StyledText>Pagina no encontrada</StyledText>
    </Screen>
  );
}
