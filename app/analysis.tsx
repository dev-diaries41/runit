import { StyleSheet, StatusBar, useWindowDimensions, View } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import { useRunIt } from '@/providers/History';
import { PaceChart } from '@/components/ui/runit/Charts';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { formatTime } from '@/lib/helpers';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Screen() {
  const { runHistory } = useRunIt();
  const { width } = useWindowDimensions();
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  

  const labels = runHistory.map(runSession =>
    runSession.name.replace(/\/[^/]*$/, '').replace('run', '').trim()
  );

  const datasets: Dataset[] = [
    {
      data: runHistory.map(runSession => runSession.pace)
    }
  ];

  // Calculate dynamic maxLabels based on device width.
  const estimatedLabelWidth = 40; 
  const maxLabels = Math.max(Math.floor(width / estimatedLabelWidth), 5); // ensure at least 5 labels are displayed
  const step = Math.ceil(labels.length / maxLabels);

  // Always show the first and last labels for better context.
  const filteredLabels = labels.map((label, index) => {
    if (index === 0 || index === labels.length - 1) return label;
    return index % step === 0 ? label : '';
  });

  const averageDistance = runHistory.reduce((total, runSession) => total + runSession.distance , 0 ) / runHistory.length;
  const averagePace = runHistory.reduce((total, runSession) => total + runSession.pace , 0 ) / runHistory.length;
  const averageTime = runHistory.reduce((total, runSession) => total + runSession.time , 0 ) / runHistory.length;
  const averageCalories = runHistory.reduce((total, runSession) => total + runSession.calories , 0 ) / runHistory.length;


  const metrics = [
      { label: 'Avg. Distance', value: averageDistance.toFixed(2) },
      { label: 'Avg. Pace', value: averagePace.toFixed(2) },
      { label: 'Avg Time', value: formatTime(averageTime) },
      { label: 'Avg Calories', value: averageCalories.toFixed(2) },
    ];

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <PaceChart
          labels={filteredLabels}
          datasets={datasets}
          title='Run Pace (min/km)'
        />
        <ThemedText type="subtitle" style={[{ color: textColor, marginVertical: sizes.layout.medium }]}>Performance Averages</ThemedText>

        <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
            <View key={index} style={[styles.metricItem]}> 
                <ThemedText style={[styles.metricLabel, { color: textColor }]}>{metric.label}</ThemedText>
                <ThemedText style={[styles.metricValue, { color: tintColor }]}>{metric.value}</ThemedText>
            </View>
        ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizes.layout.small,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight * 2 : sizes.layout.xxLarge,
  },
  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.layout.small,
    // gap: sizes.layout.xSmall
  },
  metricItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: sizes.font.medium,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: sizes.font.xLarge,
    textAlign: 'center',
  },
});
