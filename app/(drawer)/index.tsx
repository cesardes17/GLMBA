import { StyleSheet } from "react-native";

import PageContainer from "../../src/components/common/PageContainer";
import { useTheme } from "../../src/context/ThemeContext";
import { useUser } from "../../src/context/UserContext";
import { useEffect } from "react";
import StyledText from "../../src/components/common/StyledText";

export default function Home() {
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    console.log("user index.tsx: ", user);
  }, [user]);

  return (
    <PageContainer title="Inicio">
      <StyledText>Hello World</StyledText>
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
