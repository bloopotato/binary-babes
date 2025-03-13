import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LineChartComponent from '@/components/LineChartComponent';

import { getHealthMetrics } from '../main/api';

interface HealthMetric {
  value: number;
  date: string;
}

export default function StatsScreen() {
  const [metrics, setMetrics] = useState<HealthMetric[] | null>(null);
  const [loading, setLoading] = useState(true); 

  const userId = '123'; 

  useEffect(() => {
    const fetchHealthMetrics = async () => {
      try {
        const metricsData = await getHealthMetrics(userId); 
        setMetrics(metricsData); 
      } catch (error) {
        console.error('Error fetching health metrics:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchHealthMetrics();
  }, [userId]); 

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!metrics || metrics.length === 0) {
    return <Text>No health metrics available</Text>;
  }

  const data1 = [
    { value: 50, date: "Jan" },
    { value: 80, date: "Feb" },
    { value: 65, date: "Mar" },
    { value: 90, date: "Apr" },
    { value: 70, date: "May" },
    { value: 100, date: "Jun" },
  ];

  const data2 = [
    { value: 30, date: "Jan" },
    { value: 60, date: "Feb" },
    { value: 55, date: "Mar" },
    { value: 80, date: "Apr" },
    { value: 50, date: "May" },
    { value: 75, date: "Jun" },
  ];

  const data3 = [
    { value: 30, date: "Jan" },
    { value: 60, date: "Feb" },
    { value: 55, date: "Mar" },
    { value: 80, date: "Apr" },
    { value: 50, date: "May" },
    { value: 75, date: "Jun" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Statistics</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.chart}>
          <Text style={styles.title}>Chart 1</Text>
          <LineChartComponent
            data={data1}
            width={283}
            height={150}
            lineColor='#432C81'
          />
        </View>
        <View style={styles.chart}>
          <Text style={styles.title}>Chart 2</Text>
          <LineChartComponent
            data={data2}
            width={283}
            height={150}
            lineColor='#432C81'
          />
        </View>
        <View style={styles.chart}>
          <Text style={styles.title}>Chart 3</Text>
          <LineChartComponent
            data={data3}
            width={283}
            height={150}
            lineColor='#432C81'
          />
        </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81'
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81',
  },
  scrollViewContent: {
    paddingVertical: 10, 
    alignItems: 'center', 
    backgroundColor: '#FFF',
  },
  chart: {
    backgroundColor: '#EDECF4',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color: '#432C81',
    marginBottom: 10,
  },
});
