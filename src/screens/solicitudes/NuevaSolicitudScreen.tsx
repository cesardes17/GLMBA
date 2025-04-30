import FormikNuevaSolicitudForm from '@/src/components/forms/solicitudes/FormikNuevaSolicitudForm';
import { View } from 'react-native';

export default function NuevaSolicitudScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FormikNuevaSolicitudForm />
    </View>
  );
}
