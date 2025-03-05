import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from 'expo-router'
import LifestyleTab from "@/components/LifestyleTabs";

export default function LifestyleMedical() {
  const picture = require('@/assets/images/plant.png');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.textBox}>
            <Text style={styles.headerText}>Lifestyle & Medical History</Text>
          </View>
          <Image source={picture} style={styles.picture} resizeMode="contain"/>
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.tabs}>
          <LifestyleTab label="Diet & Substance Use"/>
          <LifestyleTab label="Sleep Habits"/>
          <LifestyleTab label="Fitness Levels"/>
          <LifestyleTab label="Stress Levels"/>
          <LifestyleTab label="Medical History"/>
          <LifestyleTab label="Customised Plan"/>
        </View>
      </View>
      
      
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
  top: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  header: {
    flexDirection: 'row',
    width: 343,
    height: 163,
    backgroundColor: '#EDECF4',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBox: {
    width: 200,
  },
  headerText: {
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#432C81',
    marginRight: 10,
  },
  picture: {
    width: 100,
    height: 100
  },
  bot: {
    flexShrink: 1,
    justifyContent: 'center',
    backgroundColor: '#EDECF4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
});