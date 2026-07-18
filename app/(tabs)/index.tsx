import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ReAnimated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/hooks/use-app-context';
import { ActivityRings } from '@/components/features/ActivityRings';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkline } from '@/components/ui/Sparkline';
import { FAB, type LogType } from '@/components/ui/FAB';
import { Colors } from '@/constants/theme';
import { WORKOUT_ROUTINES } from '@/constants/mockData';

const SPARKLINE_DATA = [8200, 9500, 10200, 8800, 11400, 12482, 11800];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state, actions } = useAppContext();
  const { userProfile, activityRings, stepsCount } = state;
  const { logActivity } = actions;

  // Time-based greeting
  const [greeting, setGreeting] = useState('Good morning');
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 17) {
      setGreeting('Good evening');
    } else if (hours >= 12) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good morning');
    }
  }, []);

  // Heart rate pulse simulation (±2 bpm, clamped 60–90)
  const [pulseHr, setPulseHr] = useState(state.heartRate);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseHr((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        if (next > 90) return 80;
        if (next < 60) return 65;
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subtle heart icon pulse animation
  const heartPulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [heartPulse]);

  const handleLogActivity = useCallback(
    (type: LogType) => {
      logActivity(type);
    },
    [logActivity],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Fixed Header ── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.userName}>{userProfile.name}</Text>
          </View>
        </View>
        <Pressable style={styles.calendarBtn} onPress={() => {}}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={22}
            color={Colors.brandVolt}
          />
        </Pressable>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity Rings */}
        <ActivityRings
          movePercent={activityRings.move}
          exercisePercent={activityRings.exercise}
          standPercent={activityRings.stand}
        />

        {/* Bento Metrics Grid */}
        <View style={styles.bentoGrid}>
          {/* Steps — full-width */}
          <ReAnimated.View entering={FadeInUp.duration(400).delay(100)}>
          <GlassCard style={styles.fullCard}>
            <View style={styles.stepsRow}>
              <View style={styles.stepsLeft}>
                <Text style={styles.label}>DAILY STEPS</Text>
                <Text style={styles.valueLg}>
                  {stepsCount.toLocaleString()}
                </Text>
                <View style={styles.trendRow}>
                  <MaterialCommunityIcons
                    name="trending-up"
                    size={14}
                    color={Colors.brandVolt}
                  />
                  <Text style={styles.trendText}>12% from yesterday</Text>
                </View>
                <Pressable
                  onPress={() => handleLogActivity('steps')}
                  style={styles.logBtn}
                >
                  <MaterialCommunityIcons name="plus" size={14} color="#000" />
                  <Text style={styles.logBtnText}>Log</Text>
                </Pressable>
              </View>
              <View style={styles.sparklineWrap}>
                <Sparkline
                  data={SPARKLINE_DATA}
                  color={Colors.brandVolt}
                  height={64}
                />
              </View>
            </View>
          </GlassCard>
          </ReAnimated.View>

          {/* Calories + Heart Rate — side-by-side */}
          <View style={styles.halfRow}>
            {/* Calories */}
            <ReAnimated.View entering={FadeInUp.duration(400).delay(200)}>
            <GlassCard style={styles.halfCard}>
              <MaterialCommunityIcons
                name="fire"
                size={24}
                color={Colors.brandRed}
                style={styles.cardIcon}
              />
              <Text style={styles.label}>Calories</Text>
              <View style={styles.halfValueRow}>
                <Text style={styles.valueMd}>
                  842{' '}
                  <Text style={styles.unit}>kcal</Text>
                </Text>
                <Pressable
                  onPress={() => handleLogActivity('calories')}
                  style={styles.addBtn}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={Colors.brandVolt}
                  />
                </Pressable>
              </View>
            </GlassCard>
            </ReAnimated.View>

            {/* Heart Rate */}
            <ReAnimated.View entering={FadeInUp.duration(400).delay(300)}>
            <GlassCard style={styles.halfCard}>
              <Animated.View style={{ opacity: heartPulse }}>
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color={Colors.brandRed}
                  style={styles.cardIcon}
                />
              </Animated.View>
              <Text style={styles.label}>Heart Rate</Text>
              <Text style={styles.valueMd}>
                {pulseHr}{' '}
                <Text style={styles.unit}>bpm</Text>
              </Text>
            </GlassCard>
            </ReAnimated.View>
          </View>
        </View>

        {/* ── Recent Workouts ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.workoutScrollContent}
        >
          {WORKOUT_ROUTINES.slice(0, 3).map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => router.push(`/workout/${workout.id}`)}
            >
              <View style={styles.workoutCard}>
                <Image
                  source={{ uri: workout.imageUrl }}
                  style={styles.workoutCardImage}
                  resizeMode="cover"
                />
                <View style={styles.workoutCardOverlay} />
                <View style={styles.workoutCardBody}>
                  <View style={styles.workoutBadge}>
                    <Text style={styles.workoutBadgeText}>
                      {workout.category}
                    </Text>
                  </View>
                  <Text style={styles.workoutCardTitle} numberOfLines={1}>
                    {workout.title}
                  </Text>
                  <View style={styles.workoutCardMeta}>
                    <Text style={styles.workoutCardMetaText}>
                      {workout.durationMin} min
                    </Text>
                    <Text style={styles.workoutCardMetaSep}>·</Text>
                    <Text style={styles.workoutCardMetaText}>
                      {workout.caloriesBurned} kcal
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Daily Training Tip ── */}
        <ReAnimated.View entering={FadeInUp.duration(400).delay(400)}>
        <GlassCard style={styles.tipCard}>
          <View style={styles.tipRow}>
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={28}
              color={Colors.brandVolt}
              style={styles.tipIcon}
            />
            <View style={styles.tipTextWrap}>
              <Text style={styles.tipLabel}>Today's Tip</Text>
              <Text style={styles.tipText}>
                Staying hydrated is crucial for peak performance. Aim for at
                least 2 liters of water throughout the day, and don't forget to
                refuel with protein within 30 minutes after your workout!
              </Text>
            </View>
          </View>
        </GlassCard>
        </ReAnimated.View>
      </ScrollView>

      {/* ── FAB ── */}
      <View style={styles.fabPosition}>
        <FAB onLogActivity={handleLogActivity} />
      </View>
    </SafeAreaView>
  );
}

const PADDING_H = 20;
const HEADER_H = 72;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },

  /* ── Header ── */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    height: HEADER_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_H,
    paddingTop: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(226,226,226,0.6)',
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── ScrollView ── */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_H + 12,
    paddingBottom: 100,
    paddingHorizontal: PADDING_H,
  },

  /* ── Bento Grid ── */
  bentoGrid: {
    marginTop: 8,
    gap: 16,
  },

  /* Full-width card (Steps) */
  fullCard: {
    width: '100%',
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  stepsLeft: {
    flex: 1,
  },
  stepsRight: {},
  sparklineWrap: {
    width: '50%',
    height: 64,
    justifyContent: 'flex-end',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandVolt,
  },
  logBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.brandVolt,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  logBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Half-width row */
  halfRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfCard: {
    flex: 1,
  },
  cardIcon: {
    marginBottom: 12,
  },
  halfValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Section Headers ── */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brandVolt,
  },

  /* ── Workout Cards (horizontal scroll) ── */
  workoutScrollContent: {
    paddingRight: PADDING_H,
    gap: 16,
  },
  workoutCard: {
    width: 280,
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  workoutCardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  workoutCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  workoutCardBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  workoutBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.brandVolt,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  workoutBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  workoutCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  workoutCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutCardMetaText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(226,226,226,0.7)',
  },
  workoutCardMetaSep: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(226,226,226,0.4)',
    marginHorizontal: 4,
  },

  /* ── Daily Training Tip ── */
  tipCard: {
    marginTop: 28,
    borderLeftWidth: 4,
    borderLeftColor: Colors.brandVolt,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginTop: 2,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e2e2e2',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  tipText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(226,226,226,0.7)',
    lineHeight: 20,
  },

  /* ── Typography tokens ── */
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: 'rgba(226,226,226,0.4)',
    marginBottom: 4,
  },
  valueLg: {
    fontSize: 32,
    fontWeight: '800',
    color: '#e2e2e2',
    letterSpacing: -0.5,
  },
  valueMd: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  unit: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(226,226,226,0.5)',
  },

  /* ── FAB ── */
  fabPosition: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 20,
  },
});
