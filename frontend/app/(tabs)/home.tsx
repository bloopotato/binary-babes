import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import Card from '@/components/Card';

const profile = require('@/assets/images/profile.jpg');

export default function HomeScreen() {
  const username = "Julia";

  const lifestyleImage = require('@/assets/images/plant.png');
  const treatmentImage = require('@/assets/images/treatment.png');
  const chatbotImage = require('@/assets/images/chatbot.png');
  const helpImage = require('@/assets/images/help.png');

  const cards = [
    { name: 'Lifestyle & Medical History', key: '1', route: '/cards/lifestyle-medical', image: lifestyleImage },
    { name: 'Treatment', key: '2', route: '/cards/treatment', image: treatmentImage },
    { name: 'ChatBot', key: '3', route: '/cards/chatbot', image: chatbotImage },
    { name: 'Help', key: '4', route: '/help', image: helpImage },
    { name: 'Settings', key: '5', route: '/settings' },
    { name: 'About', key: '6', route: '/about' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>👋 Hi {username}!</Text>
        <Image source={profile} style={styles.profileImage} />
      </View>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card title={item.name} href={item.route} image={item.image} />
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
  header: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: '#432C81',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listContainer: {
    paddingBottom: 10,
  }
});