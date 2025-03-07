import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Tabs from '@/components/Tabs';

const CustomisedPlan = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Tabs 
          label='Dietary Plan' 
          subLabel='Click here to explore various diet plans and their benefits'
          width={343}
        />
        <Tabs 
          label='Sleep Plan' 
          subLabel='Click here to explore various customised sleep plans and their benefits'
          width={343}
        />
        <Tabs 
          label='Fitness Plan' 
          subLabel='Click here to explore various fitness plans and their benefits'
          width={343}
        />
        <Tabs 
          label='Track Your Progress'
          width={343}
        />
      </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDECF4',
    },
    scrollViewContent: {
      alignItems: 'center',
      paddingVertical: 40
    }
});

export default CustomisedPlan;
