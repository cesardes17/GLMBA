import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from '../../common/StyledText';
import StyledButton from '../../common/StyledButton';
import StyledTextInput from '../../forms/inputs/StyledTextInput';
import { useTheme } from '../../../hooks/theme/useTheme';
import UniversalPicker from '../../forms/pickers/UniversalPicker';
import { useAuth } from '../../../hooks/auth/useAuth';

const roles = [
  { key: 'espectador', label: 'Espectador' },
  { key: 'jugador', label: 'Jugador' },
  { key: 'arbitro', label: 'Arbitro' },
];

const EditUserForm = ({ user, onSave, onCancel }) => {
  const { userData } = useAuth();

  userData.role === 'organizador'
    ? roles.push({
        key: 'co-organizador',
        label: 'Co-organizador',
      })
    : null;

  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    jerseyNumber: user.jerseyNumber,
    height: user.height,
    favPosition: user.favPosition,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...user, ...formData });
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Editar Usuario</StyledText>

      <StyledTextInput
        label="Nombre completo"
        value={formData.fullName}
        onChangeText={(value) => handleChange('fullName', value)}
      />

      <UniversalPicker
        data={roles}
        onValueChange={(value) => handleChange('role', value)}
        selectedValue={formData.role}
      />

      {user.role === 'jugador' && (
        <>
          <StyledTextInput
            label="Número"
            value={formData.jerseyNumber}
            onChangeText={(value) => handleChange('jerseyNumber', value)}
            keyboardType="numeric"
          />

          <StyledTextInput
            label="Altura (cm)"
            value={formData.height}
            onChangeText={(value) => handleChange('height', value)}
            keyboardType="numeric"
          />

          <StyledTextInput
            label="Posición"
            value={formData.favPosition}
            onChangeText={(value) => handleChange('favPosition', value)}
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        <StyledButton title="Cancelar" onPress={onCancel} danger />
        <StyledButton title="Guardar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 16,
  },
});

export default EditUserForm;
