import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface DataPoint {
  value: number;
  date: string;
}

interface LineChartComponentProps {
  data: DataPoint[];
  width: number;
  height: number;
  lineColor?: string;
  dataPointsColor?: string;
  onFocus?: (item: DataPoint, index: number) => void;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  width,
  height,
  lineColor = '#432C81',
  dataPointsColor = '#432C81',
  onFocus,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={width}
        height={height}
        spacing={40}
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#432C81' }}
        xAxisLabelTexts={data.map((item) => item.date)}
        xAxisLabelTextStyle={{ color: '#432C81' }}
        noOfSections={5}
        dashWidth={7}
        color={lineColor}
        thickness={2}
        curved
        isAnimated
        hideDataPoints={false}
        dataPointsColor={dataPointsColor}
        dataPointsRadius={4}
        focusEnabled
        showDataPointOnFocus
        showTextOnFocus
        focusedDataPointRadius={6}
        onFocus={(item: DataPoint, index: number) => {
          setSelectedIndex(index);
          if (onFocus) onFocus(item, index);
        }}
        focusedCustomDataPoint={(item: DataPoint, index: number) => (
          selectedIndex === index ? (
            <View style={[styles.labelContainer, { left: index * 50 - 20 }]}>
              <Text style={styles.labelText}>{item.value}</Text>
            </View>
          ) : null
        )}
        unFocusOnPressOut={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    overflow: 'hidden'
  },
  labelContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    position: 'absolute',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  labelText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 12,
    color: '#432C81',
  },
});

export default LineChartComponent;
