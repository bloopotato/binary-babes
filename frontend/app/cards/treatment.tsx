import { Text, View, StyleSheet, Image } from 'react-native';
import Tabs from '@/components/Tabs';

export default function Treatment() {
  const picture = require('@/assets/images/treatment.png');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.textBox}>
            <Text style={styles.headerText}>Treatment</Text>
          </View>
          <Image source={picture} style={styles.picture} resizeMode='contain'/>
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.tabs}>
          <Tabs label='Current Medication' width={343} />
          <Tabs label='Current Symptoms' width={343} />
          <Tabs label='Appointment & Medication Schedule' href='./appointments' width={343} />
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
    height: 116,
    backgroundColor: '#EDECF4',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBox: {
    width: 200,
  },
  headerText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    color: '#432C81',
  },
  picture: {
    width: 100,
    height: 100
  },
  bot: {
    flexShrink: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDECF4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  tabs: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
});