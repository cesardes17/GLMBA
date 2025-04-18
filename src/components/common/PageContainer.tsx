import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { HeaderConfig } from "./HeaderConfig";
import { useTheme } from "../../context/ThemeContext";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  backTitle?: string;
  showHeader?: boolean;
}

export default function PageContainer({
  children,
  title,
  backTitle,
  showHeader = true,
}: PageContainerProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {showHeader && title && (
        <HeaderConfig title={title} backTitle={backTitle} />
      )}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
