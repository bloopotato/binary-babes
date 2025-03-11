import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginUser } from './api';

import Button from '@/components/Button';
import CustomTextInput from '@/components/InputBox';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLoginPress = async () => {
    setError('');

    try {
      const data = await loginUser(email, password);  // Ensure you're passing the correct fields here
      console.log('Login successful:', data);
      router.push('/(tabs)/home');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subheader}>Welcome back</Text>
      <Text style={styles.header}>Login</Text>
      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
      />
      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder='Password'
      />

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null }
      
      <View style={styles.footerContainer}>
        <Button theme='primary' label='Login' onPress={handleLoginPress} />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/main/signup')}>
            <Text style={[styles.text, styles.link]}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    color: '#432C81',
    fontFamily: "Raleway-Bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
  subheader: {
    color: '#432C81',
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Raleway',
    color: '#82799D',
    fontSize: 14,
    lineHeight: 21,
  },
  link: {
    fontFamily: 'Raleway',
    color: '#432C81',
    fontSize: 14, 
    lineHeight: 21,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorMessage: {
    color: '#EB5858',
    fontSize: 14,
    fontFamily: 'Raleway',
    textAlign: 'left',
    marginTop: 10,
  }
});
