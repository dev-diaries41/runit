import { StyleSheet, StatusBar, View } from 'react-native';
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

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <PaceChart labels={labels} datasets={datasets} title='Run Pace (min/km)' />
        
        <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>Performance Summary</ThemedText>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: tintColor }]} />
            <ThemedText style={[styles.legendText, { color: textColor }]}>Max</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: tintColor, opacity: 0.3 }]} />
            <ThemedText style={[styles.legendText, { color: textColor }]}>Average</ThemedText>
          </View>
        </View>

        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => {
            const avgPercentage = (metric.avg / metric.max) * 100;
            const maxPercentage = 100; // Max value is always 100% by definition
            return (
              <View key={index} style={styles.metricItem}>
                <ThemedText style={[styles.metricLabel, { color: textColor }]}>{metric.label}</ThemedText>
                
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: `${avgPercentage}%`, backgroundColor: tintColor }]} />
                  <ThemedText style={[styles.barValue, { left: `${avgPercentage}%`, color: tintColor }]}>
                    {metric.avg}
                  </ThemedText>
                </View>
                
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: `${maxPercentage}%`, backgroundColor: tintColor, opacity: 0.3 }]} />
                  <ThemedText style={[styles.barValue, { left: `${maxPercentage}%`, color: tintColor }]}>
                    {metric.max}
                  </ThemedText>
                </View>

                <View style={styles.barLabels}>
                  <ThemedText style={[styles.metricValue, { color: textColor }]}>Avg: {metric.label.includes('Time')? formatTime(metric.avg): metric.avg}</ThemedText>
                  <ThemedText style={[styles.metricValue, { color: textColor }]}>Max:  {metric.label.includes('Time')? formatTime(metric.max): metric.max}</ThemedText>
                </View>
              </View>
            );
          })}
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
    height: 10,  // Thinner height for a skinnier bar
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: sizes.layout.xSmall,
    position: 'relative',  // Important for positioning the value labels
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  barValue: {
    position: 'absolute',
    top: -20,  // Slightly above the bar to make it visible
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
