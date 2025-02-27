import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    value: string;
    onChangeText?: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    error?: boolean;
    errorMessage?: string;
  };

const CustomTextInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  error, 
  errorMessage 
}: Props) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecureText = () => {
    setIsSecureText(!isSecureText);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false); 
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.errorBorder, isFocused && styles.focusedBorder]}>
        <TextInput
          style={[styles.input, error && styles.errorBorder]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isSecureText}
          placeholderTextColor="#A095C1"
          onFocus={handleFocus} 
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.icon} onPress={toggleSecureText}>
            <Ionicons name={isSecureText ? 'eye-off' : 'eye'} size={20} color="#A095C1" />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    width: 327,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 46,
    width: 327,
    borderColor: '#EDECF4',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    //paddingHorizontal: 20,
    //paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Raleway',
    color: '#432C81',
  },
  icon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  errorBorder: {
    borderColor: '#EB5858', // Red
  },
  focusedBorder: {
    borderColor: '#432C81', 
  },
  errorText: {
    color: '#EB5858',
    fontSize: 14,
    fontFamily: 'Raleway',
    alignSelf: 'flex-start',
  }
});

export default CustomTextInput;
