import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router' /*Navigate routes*/

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href='/onboarding/onboardingPage' style={styles.button}>
        Go to Login Screen
      </Link>
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
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#432C81',
  }
});
