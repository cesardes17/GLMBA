import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StyledText from './StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  id,
  title,
  description,
  isSelected,
  onSelect,
}) => {
  const { theme } = useThemeContext();

  const cardStyle = isSelected
    ? theme.selectableCard.selected
    : theme.selectableCard.default;
  return (
    <Pressable
      onPress={() => onSelect(id)}
      style={[
        styles.container,
        {
          backgroundColor: cardStyle.background,
          borderColor: cardStyle.border,
        },
      ]}
    >
      <View style={styles.content}>
        <StyledText style={[styles.title, { color: cardStyle.title }]}>
          {title}
        </StyledText>
        <StyledText
          style={[styles.description, { color: cardStyle.description }]}
        >
          {description}
        </StyledText>
      </View>
      {isSelected && (
        <MaterialCommunityIcons
          name='check-circle'
          size={24}
          color={cardStyle.checkIcon} // ← Ya no debería dar error
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  icon: {
    marginLeft: 12,
  },
});
