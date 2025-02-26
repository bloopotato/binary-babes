import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Link, useRouter } from 'expo-router' /*Navigate routes*/

type Props = {
  label: string;
  theme?: 'primary';
  href: string;
};

export default function Button({ label, theme, href }: Props) {
    const router = useRouter();
  
    return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.button,
          theme === 'primary' ? styles.primaryButton : styles.defaultButton,
        ]}
        onPress={() => router.push(href as any)}
      >
        <Text
          style={[
            styles.buttonLabel,
            theme === 'primary' ? styles.primaryButtonText : styles.defaultButtonText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 327,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  // Default button style (Login Button)
  defaultButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#432C81',
  },
  // Primary button style (Sign Up Button)
  primaryButton: {
    backgroundColor: '#432C81',
    borderWidth: 4,
    borderColor: '#432C81',
  },
  buttonLabel: {
    fontSize: 16,
  },
  defaultButtonText: {
    color: '#432C81',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});
