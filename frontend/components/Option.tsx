import React from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type IoniconName =
  | 'person'
  | 'notifications'
  | 'eye'
  | 'shield'
  | 'volume-medium'
  | 'earth'
  | 'exit'
;

type Props = {
  label: string;
  ionicon: IoniconName;
  href?: string;
  onPress?: () => void;
};

export default function Option({ label, ionicon, href, onPress }: Props) {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (href) {
          router.push(href as any);
        }
      }}
    >
      <View style={styles.labelContainer}>
        <Ionicons name={ionicon} color='#A095C1' size={20}/>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Ionicons name={'arrow-forward'} color='#A095C1' size={20}/>
    </Pressable>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  labelText: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#432C81',
    marginLeft: 16
  },
  iconContainer: {
    backgroundColor: '#123'
  }
});