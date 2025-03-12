import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../main/api';

import Card from '@/components/Card';

const profileIcon = require('@/assets/images/profile.jpg');

export default function HomeScreen() {
  const user_name = "Julia";
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserInfo();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData(); 
  }, []);

  const lifestyleImage = require('@/assets/images/plant.png');
  const treatmentImage = require('@/assets/images/treatment.png');
  const chatbotImage = require('@/assets/images/chatbot.png');
  const helpImage = require('@/assets/images/help.png');
  const aboutImage = require('@/assets/images/about.png');

  const cards = [
    { name: 'Lifestyle & Medical History', key: '1', route: '/cards/lifestyle-medical', image: lifestyleImage },
    { name: 'Treatment', key: '2', route: '/cards/treatment', image: treatmentImage },
    { name: 'ChatBot', key: '3', route: '/cards/chatbot', image: chatbotImage },
    { name: 'Help', key: '4', route: '/onboarding/onboardingPage', image: helpImage },
    { name: 'About', key: '5', image: aboutImage }
  ];

  const goToProfile = () => {
    router.replace('./settings');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>👋 Welcome {username}!</Text>
        <TouchableOpacity style={styles.profileCircle} onPress={goToProfile}>
          <Image source={profileIcon} style={styles.profileImage} />
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81',
  },
  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EDECF4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  listContainer: {
    paddingBottom: 10,
  }
});