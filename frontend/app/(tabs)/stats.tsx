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
          if (Array.isArray(metricsData)) {
            setMetrics(metricsData);
          } else {
            setMetrics([]);
          }
        }
      } catch (error) {
        console.error('Error fetching health metrics:', error);
        setMetrics([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchHealthMetrics();
    }
  }, [username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#432C81" />
      </View>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Statistics</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.noMetricsText}>No health metrics available</Text>

          {[1, 2, 3].map((chart, index) => (
            <View key={index} style={styles.chart}>
              <Text style={styles.title}>{`Chart ${chart}`}</Text>
              <LineChartComponent
                data={[]}
                width={283}
                height={150}
                lineColor='#432C81'
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Map the health metrics for the chart
  const healthMetricsData = metrics.map((metric) => ({
    value: metric.value,
    date: metric.date,
  }));

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

        {[1, 2, 3].map((chart, index) => (
          <View key={index} style={styles.chart}>
            <Text style={styles.title}>{`Chart ${chart}`}</Text>
            <LineChartComponent
              data={[
                { value: 30 + index * 10, date: "Jan" },
                { value: 60 + index * 5, date: "Feb" },
                { value: 55 + index * 8, date: "Mar" },
                { value: 80 + index * 4, date: "Apr" },
                { value: 50 + index * 7, date: "May" },
                { value: 75 + index * 6, date: "Jun" },
              ]}
              width={283}
              height={150}
              lineColor='#432C81'
            />
          </View>
        ))}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
