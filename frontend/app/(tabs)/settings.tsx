import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router' /*Navigate routes*/

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Link href='/(tabs)/home' style={styles.button}>
        Go to Home Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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