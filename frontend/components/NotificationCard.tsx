import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  label: string;
  desc: string;
  colour: string;
  href?: string;
  onPress?: () => void;
};

export default function NotificationCard({ label, desc, colour, href, onPress }: Props) {
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
      <View style={[styles.colorDot, { backgroundColor: colour }]} />
      <View style={styles.textContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.descText}>{desc}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    height: 104,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#EDECF4'
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 8
  },
  textContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    alignSelf: 'flex-start'
  },
  labelText: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#432C81',
  },
  descText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    color: '#7B6BA8',
  }
});