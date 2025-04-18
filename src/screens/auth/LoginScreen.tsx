import { Formik } from "formik";
import { Text, View } from "react-native";
import StyledButton from "../../components/common/StyledButton";
import { router } from "expo-router";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values: typeof initialValues) => {
  console.log("values: ", values);
};

export default function LoginScreen() {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, handleBlur, handleReset, values }) => {
        return (
          <View>
            <Text>LoginScreen</Text>

            <StyledButton
              title="Registrarse"
              onPress={() => {
                router.replace("/(auth)/registro");
              }}
              variant="outline"
            />
          </View>
        );
      }}
    </Formik>
  );
}
