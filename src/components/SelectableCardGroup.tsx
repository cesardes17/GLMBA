import React from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { SelectableCard } from "./SelectableCard";

interface Option {
  id: string;
  title: string;
  description: string;
}

interface SelectableCardGroupProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const SelectableCardGroup: React.FC<SelectableCardGroupProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  return (
    <View
      style={[
        styles.container,
        isWeb && styles.webContainer,
        isWeb && width > 768 && styles.webWidth,
      ]}
    >
      {options.map((option) => (
        <SelectableCard
          key={option.id}
          id={option.id}
          title={option.title}
          description={option.description}
          isSelected={selectedId === option.id}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: Platform.OS === "web" ? "35%" : "100%",
    padding: 16,
  },
  webContainer: {
    alignSelf: "center",
  },
  webWidth: {
    width: "35%",
  },
});
