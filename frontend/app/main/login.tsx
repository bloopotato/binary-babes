import { Text, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginUser } from './api';
import { Axios } from 'axios';

import Button from '@/components/Button';
import CustomTextInput from '@/components/InputBox';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleLoginPress = async () => {
    Keyboard.dismiss();
    
    let valid = true;

    if (!username) {
      setUsernameError('Email is required.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const data = await loginUser(username, password);
        console.log('Login successful');
        router.replace('/home');
      } catch (err) {
        console.error('Login Error:', err);
        setUsernameError('Invalid username or password');
        setPasswordError('Invalid username or password');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subheader}>Welcome back</Text>
      <Text style={styles.header}>Login</Text>
      <CustomTextInput
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
        error={usernameError !== ''}
        errorMessage={usernameError}
      />
      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder='Password'
        error={passwordError !== ''}
        errorMessage={passwordError}
      />
      
      <View style={styles.footerContainer}>
        <Button theme='primary' label='Login' onPress={handleLoginPress} />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/main/signup')}>
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
