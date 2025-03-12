import { Text, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { fetchUserInfo, signupUser } from './api'; // Import signup function

import Button from '@/components/Button';
import CustomTextInput from '@/components/InputBox';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const router = useRouter();

  const handleSignupPress = async () => {
    Keyboard.dismiss();
    
    let valid = true;
/*
    if (!name) {
      setNameError('Full Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }*/

    if (!name || !email || !password) {
      setNameError('All fields are required');
      setEmailError('All fields are required');
      setPasswordError('All fields are required');
      setConfirmPasswordError('All fields are required');
      valid = false;
      return;
    } else {
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }

    if (valid) {
      try {
        const data = await signupUser(name, email, password);
        console.log('Signup successful');
        const userInfo = await fetchUserInfo();
        console.log('User Info:', userInfo);
        router.replace('/onboarding/onboardingPage');
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.error) {
          if (err.response.data.error === "Username already exists") {
            setNameError('Username already exists');
          } else {
            setNameError(err.response.data.error);
          }
        } else {
          console.error('Signup Error:', err);
          setNameError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        error={nameError !== ''}
        errorMessage={nameError}
      />

      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        error={emailError !== ''}
        errorMessage={emailError}
      />

      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
        error={passwordError !== ''}
        errorMessage={passwordError}
      />

      <CustomTextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholder="Re-enter password"
        error={confirmPasswordError !== ''}
        errorMessage={confirmPasswordError}
      />

      <View style={styles.footerContainer}>
        <Button theme='primary' label='Sign Up' onPress={handleSignupPress} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace('/main/login')}>
            <Text style={[styles.text, styles.link]}>Login</Text>
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
  },
  header: {
    color: '#432C81',
    fontFamily: 'Raleway-Bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
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
    alignSelf: 'flex-start',
  }
});
