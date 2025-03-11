import { Text, View, StyleSheet, Image } from 'react-native';
import { logoutUser } from '../main/api';
import { useRouter } from 'expo-router';

import Option from '@/components/Option';

const profileIcon = require('@/assets/images/profile.jpg');

export default function Settings() {
  const username = "Julia Mario";
  const email = "juliamario@mail.com";

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutUser(); 
      router.push('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Image source={profileIcon} style={styles.profileImage} />
        </View>
        <Text style={styles.nameText}>{username}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.optionContainer}>
        <Option label='Account' ionicon='person' />
        <Option label='Notification' ionicon='notifications' href='./notifications' />
        <Option label='Appearance' ionicon='eye' />
        <Option label='Privacy & Security' ionicon='shield' />
        <Option label='Sound' ionicon='volume-medium' />
        <Option label='Language' ionicon='earth' />
        <Option label='Logout' ionicon='exit' href='/' onPress={handleLogout}/>
      </View>
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
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81'
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileCircle: {
    width: 112,
    height: 112,
    backgroundColor: '#EDECF4',
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48
  },
  nameText: {
    fontFamily: 'Raleway-Bold', 
    fontSize: 24, 
    color: '#432C81',
    marginBottom: 12
  },
  emailText: {
    fontFamily: 'Raleway', 
    fontSize: 12, 
    color: '#7B6BA8'
  },
  optionContainer: {
    flex: 1,
    padding: 24
  }
});