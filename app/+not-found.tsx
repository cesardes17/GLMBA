import { View, StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text>Not Found</Text>;
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
