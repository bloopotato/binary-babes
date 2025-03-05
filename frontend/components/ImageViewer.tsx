import { Dimensions, StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
};

const screenWidth = Dimensions.get('window').width;

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain',
    borderRadius: 18
  },
});
