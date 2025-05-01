import { useMemo, useState } from 'react';
import { useUserContext } from '@/src/contexts/UserContext';
import FormikCompletarPerfilForm from '@/src/components/forms/auth/FormikCompletarPerfilForm';
import { getInitialValuesFromUser } from '@/src/utils/getInitialValuesFromUser';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';

export default function EditarPerfilScreen() {
  const [loading, setLoading] = useState(false);
  const { usuario } = useUserContext();

  const initialValues = useMemo(() => {
    if (!usuario) return null;
    return getInitialValuesFromUser(usuario);
  }, [usuario]);

  if (loading || !initialValues) {
    return (
      <StyledActivityIndicator
        message={
          loading ? 'Editando el perfil...' : 'Cargando datos del usuario...'
        }
      />
    );
  }

  return (
    <FormikCompletarPerfilForm
      setLoading={setLoading}
      initialValues={initialValues}
      isEditing={true}
    />
  );
}
