import { StyleSheet, View, Pressable, Text, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router' 

type Props = {
  label: string;
  subLabel?: string;
  href?: string;
  onPress?: () => void;
  width?: number | string; 
  height?: number | string; 
};

export default function LifestyleTab({ label, subLabel = 'Click here', href, width = 166, height = 129, onPress }: Props) {
    const router = useRouter();
  
    return (
    <View
      style={[styles.tabContainer, { width, height } as ViewStyle]}
    >
      <Pressable
        style={[styles.tab, { width: '100%', height: '100%' }]}
        onPress={() => {
          if (onPress) {
            onPress();
          } else if (href) {
            router.push(href as any);
          }
        }}
      >
        <Text style={styles.tabLabel}>{label}</Text>
        <View style={styles.subLabelContainer}>
          <Text style={styles.subLabelText}>{subLabel}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#432C81',
    elevation: 5,
    paddingHorizontal: 10
  },
  tabLabel: {
    fontSize: 18,
    fontFamily: 'Raleway',
    paddingTop: 24,
    paddingHorizontal: 16,
    color: '#432C81',
    fontWeight: 'bold',
  },
  subLabelContainer: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    justifyContent: 'flex-start'
  },
  subLabelText: {
    fontSize: 12,
    fontFamily: 'Raleway',
    color: '#A095C1',
    paddingHorizontal: 16,
  }
});
