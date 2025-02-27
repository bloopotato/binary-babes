import { Text, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import Button from '@/components/Button';
import CustomTextInput from '@/components/InputBox';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const router = useRouter();

  const handleSignupPress = async () => {
    Keyboard.dismiss();
    setIsSubmitted(true); // Mark form as submitted
    
    // Validation checks
    let valid = true;

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
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      console.log('Signup successful');
      router.push('/(tabs)/home');
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
        <Button theme="primary" label="Sign Up" onPress={handleSignupPress} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/main/login')}>
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
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
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
