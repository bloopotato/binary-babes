import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import LineChartComponent from '@/components/LineChartComponent';
import { fetchUserInfo, getHealthMetrics } from '../main/api';

interface HealthMetric {
  value: number;
  date: string;
}

export default function StatsScreen() {
  const [metrics, setMetrics] = useState<HealthMetric[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserInfo();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchHealthMetrics = async () => {
      try {
        if (username) {
          const metricsData = await getHealthMetrics(username);
          setMetrics(metricsData);
        }
      } catch (error) {
        console.error('Error fetching health metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchHealthMetrics();
    }
  }, [username]);

  if (loading) {
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#432C81" />
    </View>
  }

  // If no metrics or if metrics are empty, show the message above the charts
  if (!metrics || metrics.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Statistics</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.noMetricsText}>No health metrics available</Text>
          
          {/* Render other charts below the "No health metrics available" message */}
          <View style={styles.chart}>
            <Text style={styles.title}>Chart 1</Text>
            <LineChartComponent
              data={[]}
              width={283}
              height={150}
              lineColor='#432C81'
            />
          </View>
          <View style={styles.chart}>
            <Text style={styles.title}>Chart 2</Text>
            <LineChartComponent
              data={[]}
              width={283}
              height={150}
              lineColor='#432C81'
            />
          </View>
          <View style={styles.chart}>
            <Text style={styles.title}>Chart 3</Text>
            <LineChartComponent
              data={[]}
              width={283}
              height={150}
              lineColor='#432C81'
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  // If metrics are available, render the health metrics chart and other charts
  const healthMetricsData = metrics.map((metric) => ({
    value: metric.value,
    date: metric.date,
  }));

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
          <Text style={styles.title}>Health Metrics</Text>
          <LineChartComponent
            data={healthMetricsData}
            width={283}
            height={150}
            lineColor='#432C81'
          />
        </View>

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
    color: '#432C81',
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
  noMetricsText: {
    fontSize: 18,
    color: '#FF0000',
    fontFamily: 'Raleway-Bold',
    marginBottom: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
