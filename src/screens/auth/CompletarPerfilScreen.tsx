import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import FormikCompletarPerfilForm from '@/src/components/forms/auth/FormikCompletarPerfilForm';
import { useState } from 'react';

export default function CompletarPerfilScreen() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    rol_id: '',
    nombre: '',
    apellidos: '',
    posicion_preferida: '',
    altura_cm: '',
    peso_kg: '',
    descripcion: '',
    dorsal_preferido: '',
    imagen_perfil: '',
  };

  if (loading)
    return <StyledActivityIndicator message='Completando el perfil...' />;

  return (
    <FormikCompletarPerfilForm
      initialValues={initialValues}
      setLoading={setLoading}
    />
  );
}
