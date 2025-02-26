import { Text, View, StyleSheet, ImageComponent } from 'react-native';
import { Link } from 'expo-router' /*Navigate routes*/

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
        <Button theme="primary" label="Sign up" href="/home" />
        <Button label="Login" href="/home" />
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
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
