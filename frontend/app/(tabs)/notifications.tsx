import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router' /*Navigate routes*/

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
      <Link href='/home' style={styles.button}>
        Go to Home Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});