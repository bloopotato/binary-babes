import { Text, View, StyleSheet, LogBox } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/Lifesavers-Bust.png')

LogBox.ignoreAllLogs(true);


export default function Index() {
  return (
    <View style={styles.container}>
      
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.textTitle}>ElevAite</Text>
      </View>
      
      {/*<View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>*/}

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
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#123'
  },
  text: {
    color: '#432C81',
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    lineHeight: 26, 
    wordWrap: 'break-word',
  },
  textTitle: {
    textAlign: 'center', 
    color: '#432C81', 
    fontSize: 32, 
    fontFamily: 'Raleway-Bold',
    lineHeight: 42, 
    wordWrap: 'break-word',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    //backgroundColor: '#abc'
  },
  footerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    //backgroundColor: '#456'
  },
});
