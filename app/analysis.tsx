import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import { PaceChart } from '@/components/ui/runit/Charts';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAnalysis } from '@/hooks/runit/useAnalysis';
import { formatTime } from '@/lib/helpers';

export default function Screen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const { labels, metrics, datasets } = useAnalysis();

  const PerformanceSummary = ({performanceSummary}: {performanceSummary:  {
    label: string;
    avg: number;
    peak: number;
}[]} ) => {
    return (
      <View style={styles.metricsContainer}>
      {performanceSummary.map((metric, index) => {
        const avgPercentage = (metric.avg / metric.peak) * 100;
        const maxPercentage = 100; // Max value is always 100%
        return (
          <View key={index} style={styles.metricItem}>
            <ThemedText style={[styles.metricLabel, { color: textColor }]}>{metric.label}</ThemedText>
            
          {metric.peak > 0 &&  <View style={styles.barContainer}>
              <View style={[styles.bar, { width: `${maxPercentage}%`, backgroundColor: tintColor }]} />
              <ThemedText style={[styles.barValue, { left: `${maxPercentage}%`, color: tintColor }]}>
                {metric.peak}
              </ThemedText>
            </View>}

            <View style={styles.barContainer}>
              <View style={[styles.bar, { width: `${avgPercentage === Infinity? maxPercentage : avgPercentage}%`, backgroundColor: tintColor, opacity: 0.3 }]} />
              <ThemedText style={[styles.barValue, { left: `${avgPercentage === Infinity? maxPercentage : avgPercentage}%`, color: tintColor }]}>
                {metric.avg}
              </ThemedText>
            </View>

            <View style={styles.barLabels}>
              {metric.peak > 0 && <ThemedText style={[styles.metricValue, { color: textColor }]}>Peak:  {metric.label.includes('Time')? formatTime(metric.peak): metric.peak}</ThemedText>}
              <ThemedText style={[styles.metricValue, { color: textColor }]}>Average: {metric.label.includes('Time')? formatTime(metric.avg): metric.avg}</ThemedText>
            </View>
          </View>
        );
      })}
    </View>
    )
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <PaceChart labels={labels} datasets={datasets} title='Run Pace (min/km)' />
        <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>Performance Summary</ThemedText>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: tintColor }]} />
            <ThemedText style={[styles.legendText, { color: textColor }]}>Peak</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: tintColor, opacity: 0.3 }]} />
            <ThemedText style={[styles.legendText, { color: textColor }]}>Average</ThemedText>
          </View>
        </View>
        <PerformanceSummary performanceSummary={metrics}/>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80
    
  },
  subtitle: {
    marginVertical: sizes.layout.medium,
    marginRight: 'auto',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    width: '100%',
    gap: sizes.layout.medium,
    paddingHorizontal: sizes.layout.small,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendSquare: {
    width: 15,
    height: 15,
    borderRadius: 5,
    marginRight: sizes.layout.xSmall,
  },
  legendText: {
    fontSize: sizes.font.small,
  },
  metricsContainer: {
    flex:1,
    width: '100%',
    paddingHorizontal: sizes.layout.small,
    marginTop: sizes.layout.medium,
  },
  metricItem: {
    marginBottom: sizes.layout.medium,
  },
  metricLabel: {
    fontSize: sizes.font.medium,
    textAlign: 'left',
    marginBottom: sizes.layout.xSmall,
  },
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: sizes.layout.xSmall,
    position: 'relative',
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  barValue: {
    position: 'absolute',
    top: -20,
    fontSize: sizes.font.small,
    fontWeight: 'bold',
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.layout.xSmall,
  },
  metricValue: {
    fontSize: sizes.font.small,
  },
});
