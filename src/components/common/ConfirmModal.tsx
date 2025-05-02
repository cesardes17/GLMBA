import React from 'react';
import StyledModal from './StyledModal';
import StyledText from './StyledText';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Estás seguro de continuar?',
}: Props) {
  return (
    <StyledModal
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
    >
      <StyledText>{message}</StyledText>
    </StyledModal>
  );
}
