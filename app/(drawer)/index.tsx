import { Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import PageContainer from "../../src/components/common/PageContainer";
import { useTheme } from "../../src/theme/ThemeContext";
import StyledButton from "../../src/components/common/StyledButton";

export default function Home() {
  const { theme } = useTheme();

  return (
    <PageContainer title="Home">
      <Text>Hello World</Text>

      <StyledButton
        onPress={() => {
          router.push("/login");
        }}
        title="Ir a Login"
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
