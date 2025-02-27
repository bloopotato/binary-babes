import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';


import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/Lifesavers-Bust.png')

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Self Care</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Sign up" href="main/signup" />
        <Button label="Login" href="main/login" />
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
  text: {
    color: '#432C81',
    fontFamily: "Raleway"
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
