import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ScreenErrorBoundary } from '@/components/ui/ScreenErrorBoundary';

const TABS = ['Overview', 'Goals', 'Calendar'];
const ROUTE_MAP: Record<string, number> = {
  overview: 0,
  goals: 1,
  calendar: 2,
};
const ROUTES = ['overview', 'goals', 'calendar'] as const;

export default function StatsLayout() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const segments = pathname.split('/');
    const last = segments[segments.length - 1];
    if (last === 'stats' || last === '(tabs)') {
      router.replace('/stats/overview');
    }
  }, []);

  const currentSegment = pathname.split('/').pop() || 'overview';
  const activeIndex = ROUTE_MAP[currentSegment] ?? 0;

  const handleTabChange = (index: number) => {
    const route = ROUTES[index];
    if (route) {
      router.replace(`/stats/${route}` as const);
    }
  };

  return (
    <ScreenErrorBoundary name="Stats">
      <SafeAreaView style={styles.root} edges={['top']}>
        {/* Fixed Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons name="chart-bar" size={24} color="#CCFF00" />
              <AppText style={styles.headerTitle}>Performance</AppText>
            </View>
            <AppText style={styles.apexBadge}>Apex Stats</AppText>
          </View>
          <SegmentedControl tabs={TABS} activeIndex={activeIndex} onChange={handleTabChange} />
        </View>

        {/* Stack Content */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="overview" />
            <Stack.Screen name="goals" />
            <Stack.Screen name="calendar" />
          </Stack>
        </View>
      </SafeAreaView>
    </ScreenErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    zIndex: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.5,
  },
  apexBadge: {
    fontSize: 12,
    color: '#CCFF00',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
