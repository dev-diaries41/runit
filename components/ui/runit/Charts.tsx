import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
  } from "react-native-chart-kit";
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { ThemedText } from '../common/ThemedText';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

interface PaceChartProps {
    datasets: Dataset[];
    labels: string[];
    title?: string;
    chartConfig?: AbstractChartConfig
}
export const PaceChart = ({
    datasets, 
    labels,
    title = "Pace Chart",
    chartConfig = {}
    
}: PaceChartProps) => {
  return (
    <View>
  <ThemedText type="title">{title}</ThemedText>
  <LineChart
    data={{labels, datasets}}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    // yAxisLabel="$"
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      },
      ...chartConfig
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex:1
    }
})