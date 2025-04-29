import { Pressable, StyleSheet } from 'react-native';
import StyledText from '@/src/components/common/StyledText';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { NavigationItem } from '@/src/constants/navigationItems';

interface NavigationCardProps {
  item: NavigationItem;
  onPress: () => void;
}

export default function NavigationCard({ item, onPress }: NavigationCardProps) {
  const { theme } = useThemeContext();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        },
      ]}
    >
      <StyledText style={[styles.title, { color: theme.textPrimary }]}>
        {item.title}
      </StyledText>
      <StyledText style={[styles.description, { color: theme.textSecondary }]}>
        {item.description}
      </StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
});
