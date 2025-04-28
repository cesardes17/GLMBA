import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import FormikCompletarPerfilForm from '@/src/components/forms/auth/FormikCompletarPerfilForm';
import { useState } from 'react';

export default function CompletarPerfilScreen() {
  const [loading, setLoading] = useState(false);

  if (loading)
    return <StyledActivityIndicator message='Completando el perfil...' />;
  return <FormikCompletarPerfilForm setLoading={setLoading} />;
}
