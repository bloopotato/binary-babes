import { View, StyleSheet, FlatList } from 'react-native';
import Card from '@/components/Card';

export default function HomeScreen() {
  const cards = [
    { name: 'Lifestyle & Medical History', key: '1', route: '/cards/lifestyle-medical' },
    { name: 'Treatment', key: '2', route: '/treatment' },
    { name: 'ChatBot', key: '3', route: '/cards/chatbot' },
    { name: 'Help', key: '4', route: '/help' },
    { name: 'Settings', key: '5', route: '/settings' },
    { name: 'About', key: '6', route: '/about' }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card title={item.name} href={item.route} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      paddingTop: 20,
  },
  listContainer: {
      paddingBottom: 20,
  },
});