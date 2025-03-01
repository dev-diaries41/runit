import { StyleSheet, StatusBar, View } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import { PaceChart } from '@/components/ui/runit/Charts';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAnalysis } from '@/hooks/runit/useAnalysis';

export default function Screen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const {labels, metrics, datasets} = useAnalysis()

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <PaceChart
          labels={labels}
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
