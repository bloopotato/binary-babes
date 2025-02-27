import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';


import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/Lifesavers-Bust.png')

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.textTitle}>Self Care</Text>
      </View>
      
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  textContainer: {
    width: 375,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
  },
  text: {
    color: '#432C81',
    fontFamily: "Raleway",
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26, 
    wordWrap: 'break-word',
  },
  textTitle: {
    width: 327, 
    textAlign: 'center', 
    color: '#432C81', 
    fontSize: 32, 
    fontFamily: 'Raleway', 
    fontWeight: '700', 
    lineHeight: 42, 
    wordWrap: 'break-word',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
    flex: 1,
  },
});
