import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import Svg, { Circle } from 'react-native-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppContext } from '@/hooks/use-app-context';
import { MetricBadge } from '@/components/ui/MetricBadge';
import { BarChart, type BarItem } from '@/components/ui/BarChart';
import { LineChart } from '@/components/ui/LineChart';

function calcOffset(percent: number, radius: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference * (1 - percent / 100);
}

const WEEKLY_BARS: BarItem[] = [
  { value: 42, label: 'MON' },
  { value: 68, label: 'TUE' },
  { value: 55, label: 'WED' },
  { value: 94, label: 'THU' },
  { value: 45, label: 'FRI' },
  { value: 70, label: 'SAT' },
  { value: 30, label: 'SUN' },
];

const MONTHLY_BARS: BarItem[] = [
  { value: 320, label: 'W1' },
  { value: 410, label: 'W2' },
  { value: 380, label: 'W3' },
  { value: 450, label: 'W4' },
];

const HR_DATA = [64, 62, 66, 58, 63, 60, 61, 59, 62, 65, 63, 61, 60, 62];

export default function OverviewScreen() {
  const { state } = useAppContext();
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('weekly');

  const barData = timePeriod === 'weekly' ? WEEKLY_BARS : MONTHLY_BARS;
  const activeBarIndex = timePeriod === 'weekly' ? 3 : 2;

  const distance = timePeriod === 'weekly' ? '42.8' : '182.4';
  const pace = timePeriod === 'weekly' ? "4'52\"" : "5'12\"";

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* Weekly/Monthly Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setTimePeriod('weekly')}
          style={[styles.toggleBtn, timePeriod === 'weekly' && styles.toggleBtnActive]}
        >
          <AppText style={[styles.toggleText, timePeriod === 'weekly' && styles.toggleTextActive]}>
            WEEKLY
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimePeriod('monthly')}
          style={[styles.toggleBtn, timePeriod === 'monthly' && styles.toggleBtnActive]}
        >
          <AppText style={[styles.toggleText, timePeriod === 'monthly' && styles.toggleTextActive]}>
            MONTHLY
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Metric Summary Grid */}
      <View style={styles.metricRow}>
        <View style={styles.metricCol}>
          <MetricBadge
            icon="map-marker-distance"
            value={distance}
            unit="KM"
            label="TOTAL DISTANCE"
          />
        </View>
        <View style={styles.metricCol}>
          <MetricBadge
            icon="speedometer"
            value={pace}
            unit="MIN/KM"
            label="AVG PACE"
          />
        </View>
      </View>

      {/* Daily Performance BarChart */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Daily Performance</AppText>
          <AppText style={styles.performanceBadge}>+12% VS LAST WEEK</AppText>
        </View>
        <View style={styles.chartCard}>
          <View style={styles.chartBadge}>
            <AppText style={styles.chartBadgeText}>Active Step Target: 10k</AppText>
          </View>
          <BarChart data={barData} activeIndex={activeBarIndex} height={160} />
          <View style={styles.barLabelsRow}>
            {barData.map((item, i) => (
              <AppText
                key={i}
                style={[styles.barLabel, i === activeBarIndex && styles.barLabelActive]}
              >
                {item.label}
              </AppText>
            ))}
          </View>
        </View>
      </View>

      {/* Resting Heart Rate LineChart */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Resting Heart Rate</AppText>
          <View style={styles.hrLegend}>
            <View style={styles.hrDot} />
            <AppText style={styles.hrLegendText}>62 BPM AVG</AppText>
          </View>
        </View>
        <View style={[styles.chartCard, styles.hrChartCard]}>
          <LineChart data={HR_DATA} activeIndex={6} height={160} />
          <View style={styles.hrBadge}>
            <AppText style={styles.hrBadgeText}>THU: 58 BPM</AppText>
          </View>
        </View>
      </View>

      {/* Total Calories Progress Circle Card */}
      <View style={styles.caloriesCard}>
        <View style={styles.caloriesCircleWrap}>
          <Svg width={80} height={80} viewBox="0 0 80 80" style={styles.caloriesSvg}>
            <Circle
              cx={40}
              cy={40}
              r={32}
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={6}
            />
            <Circle
              cx={40}
              cy={40}
              r={32}
              fill="transparent"
              stroke="#CCFF00"
              strokeWidth={6}
              strokeDasharray={2 * Math.PI * 32}
              strokeDashoffset={calcOffset(78, 32)}
              strokeLinecap="round"
            />
          </Svg>
          <MaterialCommunityIcons name="fire" size={28} color="#CCFF00" />
        </View>
        <View style={styles.caloriesInfo}>
          <AppText style={styles.caloriesLabel}>CALORIES BURNED (OCT)</AppText>
          <AppText style={styles.caloriesValue}>12,450</AppText>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* ── Toggle ── */
  toggleContainer: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    maxWidth: 200,
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
  },
  toggleBtnActive: {
    backgroundColor: '#CCFF00',
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.5)',
  },
  toggleTextActive: {
    color: '#000',
  },

  /* ── Metric Grid ── */
  metricRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  metricCol: {
    flex: 1,
  },

  /* ── Sections ── */
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  performanceBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#abd600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  /* ── Chart Card ── */
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 16,
  },
  chartBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#CCFF00',
  },
  barLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 8,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.4)',
  },
  barLabelActive: {
    color: '#CCFF00',
  },

  /* ── HR Chart ── */
  hrChartCard: {
    height: 208,
  },
  hrLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hrDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#abd600',
  },
  hrLegendText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hrBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  hrBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#e2e2e2',
  },

  /* ── Calories Card ── */
  caloriesCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
  },
  caloriesCircleWrap: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  caloriesSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  caloriesInfo: {
    flex: 1,
  },
  caloriesLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#e2e2e2',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#CCFF00',
    height: '100%',
    width: '78%',
    borderRadius: 999,
  },
});
