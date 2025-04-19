import { Text, View } from "react-native";
import { Formik } from "formik";

const initialValues = {
  email: "",
  password: "",
};
const onSubmit = (values: typeof initialValues) => {
  console.log("values: ", values);
};

export default function SetupProfileScreen() {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => {
        return (
          <View>
            <Text>SetupProfileScreen</Text>
          </View>
        );
      }}
    </Formik>
  );
}
