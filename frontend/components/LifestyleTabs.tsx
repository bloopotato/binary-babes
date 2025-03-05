import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router' /*Navigate routes*/

type Props = {
  label: string;
  theme?: 'primary';
  href?: string;
  onPress?: () => void;
};

export default function LifestyleTab({ label, theme, href, onPress }: Props) {
    const router = useRouter();
  
    return (
    <View style={styles.tabContainer}>
      <Pressable
        style={styles.tab}
        onPress={() => {
          if (onPress) {
            onPress();
          } else if (href) {
            router.push(href as any);
          }
        }}
      >
        <Text
          style={styles.tabLabel}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: 166,
    height: 129,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#432C81',
    elevation: 5,
  },
  tabLabel: {
    fontSize: 18,
    fontFamily: 'Raleway',
    paddingVertical: 24,
    paddingHorizontal: 16,
    color: '#432C81',
    fontWeight: 'bold'
  },
});
