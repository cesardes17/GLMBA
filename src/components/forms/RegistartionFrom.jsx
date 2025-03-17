import { Formik } from "formik";
import { View, Text } from "react-native";
import FormikInputValue from "../formik/FormikInputValue";
import FormikPickerValue from "../formik/FormikPickerValue"; // Importamos el nuevo componente
import { registrationSchema } from "../../schemas/ValidationSchemas";
import StyledButton from "../StyledButton";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "espectador",
  jerseyNumber: "",
  height: "",
  favPosition: "base",
};

const roleData = [
  { key: "espectador", label: "Espectador" },
  { key: "jugador", label: "Jugador" },
];

const positionData = [
  { key: "base", label: "Base" },
  { key: "escolta", label: "Escolta" },
  { key: "alero", label: "Alero" },
  { key: "ala-pivot", label: "Ala-pívot" },
  { key: "pivot", label: "Pívot" },
];

export default function RegistrationForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, isValid, dirty, values }) => (
        <View>
          <FormikInputValue name="fullName" placeholder="Nombre completo" />
          <FormikInputValue name="email" placeholder="Correo electrónico" />
          <FormikInputValue
            name="password"
            placeholder="Contraseña"
            secureTextEntry
          />
          <FormikInputValue
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            secureTextEntry
          />

          <FormikPickerValue
            name="role"
            data={roleData}
            initialValue={roleData[0].key}
          />
          {values.role === "jugador" && (
            <>
              <FormikInputValue
                name="jerseyNumber"
                placeholder="Numero de Camiseta"
              />
              <FormikInputValue name="height" placeholder="Altura" />

              <FormikPickerValue
                name="favPosition"
                data={positionData}
                initialValue={positionData[0].key}
              />
            </>
          )}

          <StyledButton
            title="Registrarse"
            onPress={handleSubmit}
            disabled={!isValid || !dirty}
            style={{ marginTop: 20 }}
          />
        </View>
      )}
    </Formik>
  );
}
