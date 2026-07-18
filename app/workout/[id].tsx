import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { WORKOUT_ROUTINES } from '@/constants/mockData';
import { LabelCaps } from '@/components/ui/Typography';
import { VoltButton } from '@/components/ui/VoltButton';
import { Colors } from '@/constants/theme';
import { useAppContext } from '@/hooks/use-app-context';
import { ScreenErrorBoundary } from '@/components/ui/ScreenErrorBoundary';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ActiveSession {
  isRunning: boolean;
  currentExerciseIndex: number;
  secondsLeft: number;
  isFinished: boolean;
}

const SECONDS_PER_EXERCISE = 10;
const SVG_RADIUS = 50;
const SVG_STROKE_WIDTH = 6;
const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;

const PADDING_H = 20;

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const { actions } = useAppContext();
  const progress = useSharedValue(1);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  useEffect(() => {
    if (!activeSession || !activeSession.isRunning || activeSession.isFinished) return;

    const interval = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || !prev.isRunning || prev.isFinished) return prev;
        const nextSec = prev.secondsLeft - 1;
        if (nextSec <= 0) {
          const nextIdx = prev.currentExerciseIndex + 1;
          if (nextIdx >= workout!.exercises.length) {
            actions.completeWorkout(workout!.caloriesBurned, workout!.durationMin);
            return { ...prev, isRunning: false, isFinished: true, secondsLeft: 0 };
          }
          return { ...prev, currentExerciseIndex: nextIdx, secondsLeft: SECONDS_PER_EXERCISE };
        }
        return { ...prev, secondsLeft: nextSec };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.isRunning, activeSession?.isFinished]);

  useEffect(() => {
    if (activeSession) {
      progress.value = withTiming(activeSession.secondsLeft / SECONDS_PER_EXERCISE, {
        duration: 400,
        easing: Easing.linear,
      });
    }
  }, [activeSession?.secondsLeft]);

  const workout = WORKOUT_ROUTINES.find((w) => w.id === id);

  const handleBack = useCallback(() => router.back(), []);
  const handleToggleFavorite = useCallback(() => setIsFavorited((prev) => !prev), []);

  if (!workout) {
    return (
      <ScreenErrorBoundary name="WorkoutDetail/NotFound">
        <SafeAreaView style={styles.notFoundWrap} edges={['top']}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="rgba(255,255,255,0.3)" />
          <AppText style={styles.notFoundText}>Workout not found</AppText>
          <TouchableOpacity onPress={handleBack} style={styles.notFoundBtn} activeOpacity={0.7}>
            <AppText style={styles.notFoundBtnText}>Go Back</AppText>
          </TouchableOpacity>
        </SafeAreaView>
      </ScreenErrorBoundary>
    );
  }

  return (
    <ScreenErrorBoundary name="WorkoutDetail">
      <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Image Section (480px) ── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: workout.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
          />

          {/* Gradient overlay – three layers faking a fade */}
          <View style={styles.gradientLayer1} />
          <View style={styles.gradientLayer2} />
          <View style={styles.gradientLayer3} />

          {/* Badges + Title on the gradient */}
          <View style={styles.heroContent}>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <LabelCaps style={styles.badgeText}>{workout.intensity} LEVEL</LabelCaps>
              </View>
              <View style={styles.badge}>
                <LabelCaps style={styles.badgeText}>{workout.category}</LabelCaps>
              </View>
            </View>
            <AppText style={styles.heroTitle}>{workout.title}</AppText>
            <AppText style={styles.heroDescription}>{workout.description}</AppText>
          </View>
        </View>

        {/* ── Header Controls (back + favorite) ── */}
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={handleBack} style={styles.headerBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.headerBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorited ? Colors.brandRed : '#fff'}
            />
          </TouchableOpacity>
        </View>

        {/* ── Main Content ── */}
        <View style={styles.contentArea}>
          {/* Stats Grid (2 columns) */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="clock-outline" size={26} color={Colors.brandVolt} />
              <LabelCaps style={styles.statLabel}>Duration</LabelCaps>
              <AppText style={styles.statValue}>{workout.durationMin} min</AppText>
            </View>

            <View style={styles.statCard}>
              <MaterialCommunityIcons name="fire" size={26} color={Colors.brandVolt} />
              <LabelCaps style={styles.statLabel}>Est. Burn</LabelCaps>
              <AppText style={styles.statValue}>{workout.caloriesBurned} kcal</AppText>
            </View>
          </View>

          {/* Exercise Routine */}
          <View style={styles.sectionGap}>
            <View style={styles.sectionRow}>
              <AppText style={styles.sectionTitle}>Exercise Routine</AppText>
              <AppText style={styles.sectionCount}>{workout.exercises.length} Exercises</AppText>
            </View>

            <View style={styles.exerciseList}>
              {workout.exercises.map((ex, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={styles.exerciseCard}
                >
                  <View style={styles.exerciseImageWrap}>
                    <Image
                      source={{ uri: ex.imageUrl }}
                      style={styles.exerciseImage}
                      contentFit="cover"
                    />
                  </View>
                  <View style={styles.exerciseInfo}>
                    <AppText style={styles.exerciseName}>{ex.name}</AppText>
                    <AppText style={styles.exerciseMeta}>
                      {ex.type} &bull; {ex.durationText}
                    </AppText>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.3)" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Coach Pro Tip */}
          <View style={styles.coachCard}>
            <View style={styles.coachRow}>
              <View style={styles.coachAccent} />
              <View style={styles.coachBody}>
                <View style={styles.coachHeader}>
                  <MaterialCommunityIcons name="information-outline" size={16} color={Colors.voltDim} />
                  <AppText style={styles.coachLabel}>Coach Pro Tip</AppText>
                </View>
                <AppText style={styles.coachText}>
                  &ldquo;Keep your core tight during the workouts to protect your lower back and
                  maximize engagement. Stand tall, land soft, and stay hydrated!&rdquo;
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Fixed Bottom START Button ── */}
      <View style={styles.bottomArea}>
        <View style={styles.bottomGradient1} />
        <View style={styles.bottomGradient2} />
        <View style={styles.bottomContent}>
          <View style={styles.fullWidth}>
            <VoltButton
              title="START ACTIVE WORKOUT"
              onPress={() =>
                setActiveSession({
                  isRunning: true,
                  currentExerciseIndex: 0,
                  secondsLeft: SECONDS_PER_EXERCISE,
                  isFinished: false,
                })
              }
            />
          </View>
        </View>
      </View>

      {/* ── Timer Overlay ── */}
      {activeSession && (
        <View style={styles.timerOverlay}>
          {activeSession.isFinished ? (
            /* Completion Screen */
            <View style={styles.completionWrap}>
              <MaterialCommunityIcons
                name="check-circle"
                size={72}
                color={Colors.brandVolt}
                style={styles.completionIcon}
              />
              <AppText style={styles.completionTitle}>Workout Completed!</AppText>
              <AppText style={styles.completionText}>
                Awesome effort, Athlete! Your stats have been synced to Apple Health
                and your daily goals have been updated.
              </AppText>

              <View style={styles.completionStatsCard}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <AppText style={styles.statLabel2}>Calories Burned</AppText>
                    <AppText style={styles.statValue2}>{workout!.caloriesBurned} kcal</AppText>
                  </View>
                  <View style={styles.statItem}>
                    <AppText style={styles.statLabel2}>Active Time</AppText>
                    <AppText style={styles.statValue2}>{workout!.durationMin} min</AppText>
                  </View>
                </View>
              </View>

              <View style={[styles.fullWidth, { marginTop: 32 }]}>
                <VoltButton
                  title="RETURN TO DASHBOARD"
                  onPress={() => {
                    setActiveSession(null);
                    router.back();
                  }}
                />
              </View>
            </View>
          ) : (
            /* Active Exercise Screen */
            <>
              <View style={styles.activeHeader}>
                <AppText style={styles.activeLabel}>ACTIVE TRAINING SESSION</AppText>
                <TouchableOpacity
                  onPress={() => setActiveSession(null)}
                  style={styles.closeBtn}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.activeMain}>
                {/* Exercise image */}
                <View style={styles.activeExerciseImageContainer}>
                  <Image
                    source={{
                      uri:
                        workout!.exercises[activeSession.currentExerciseIndex]?.imageUrl ?? '',
                    }}
                    style={styles.activeExerciseImage}
                    contentFit="cover"
                  />
                </View>

                <View style={styles.activeExerciseInfo}>
                  <AppText style={styles.exerciseCounter}>
                    EXERCISE {activeSession.currentExerciseIndex + 1} OF{' '}
                    {workout!.exercises.length}
                  </AppText>
                  <AppText style={styles.activeExerciseName}>
                    {workout!.exercises[activeSession.currentExerciseIndex]?.name}
                  </AppText>
                  <AppText style={styles.activeExerciseType}>
                    {workout!.exercises[activeSession.currentExerciseIndex]?.type}
                  </AppText>
                </View>

                {/* SVG countdown ring */}
                <View style={styles.timerRingContainer}>
                  <Svg style={styles.timerSvg} viewBox="0 0 128 128">
                    <Circle
                      cx="64"
                      cy="64"
                      r={SVG_RADIUS}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth={SVG_STROKE_WIDTH}
                      transform="rotate(-90 64 64)"
                    />
                    <AnimatedCircle
                      cx="64"
                      cy="64"
                      r={SVG_RADIUS}
                      fill="transparent"
                      stroke={Colors.brandVolt}
                      strokeWidth={SVG_STROKE_WIDTH}
                      strokeDasharray={CIRCUMFERENCE}
                      strokeLinecap="round"
                      animatedProps={animatedCircleProps}
                      transform="rotate(-90 64 64)"
                    />
                  </Svg>
                  <AppText style={styles.timerText}>
                    {activeSession.secondsLeft}s
                  </AppText>
                </View>

                {/* Pause / Resume + Skip */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    onPress={() =>
                      setActiveSession((prev) => prev && { ...prev, isRunning: !prev.isRunning })
                    }
                    style={styles.actionBtn}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={activeSession.isRunning ? 'pause' : 'play'}
                      size={16}
                      color="#fff"
                    />
                    <AppText style={styles.actionBtnText}>
                      {activeSession.isRunning ? 'Pause' : 'Resume'}
                    </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      const nextIdx = activeSession.currentExerciseIndex + 1;
                      if (nextIdx >= workout!.exercises.length) {
                        actions.completeWorkout(workout!.caloriesBurned, workout!.durationMin);
                        setActiveSession((prev) =>
                          prev ? { ...prev, isRunning: false, isFinished: true } : prev
                        );
                      } else {
                        setActiveSession((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentExerciseIndex: nextIdx,
                                secondsLeft: SECONDS_PER_EXERCISE,
                              }
                            : prev
                        );
                      }
                    }}
                    style={styles.actionBtn}
                    activeOpacity={0.7}
                  >
                    <AppText style={styles.actionBtnText}>Skip</AppText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerArea}>
                <AppText style={styles.footerText}>
                  Keep breathing. Pace yourself to optimize metabolic peak.
                </AppText>
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
    </ScreenErrorBoundary>
  );
}

const styles = StyleSheet.create({
  // ── Root / Layout ──
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  fullWidth: {
    width: '100%',
  },

  // ── Not Found Screen ──
  notFoundWrap: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  notFoundText: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
  },
  notFoundBtn: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  notFoundBtnText: {
    color: '#e2e2e2',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Hero Section ──
  hero: {
    height: 480,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  // Gradient overlay layers (fake fade from bottom)
  gradientLayer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 192,
    backgroundColor: '#000',
  },
  gradientLayer2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  gradientLayer3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  // Hero badges + title
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: PADDING_H,
    paddingBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  badgeText: {
    color: '#e2e2e2',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e2e2e2',
    letterSpacing: -0.4,
    lineHeight: 34,
  },
  heroDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    maxWidth: 320,
    marginTop: 4,
  },

  // ── Header Controls ──
  headerControls: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_H,
    zIndex: 20,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Main Content Area ──
  contentArea: {
    paddingHorizontal: PADDING_H,
    marginTop: -16,
    zIndex: 10,
    gap: 32,
  },

  // ── Stats Grid ──
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.4)',
    marginTop: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e2e2e2',
    marginTop: 2,
  },

  // ── Exercise Routine Section ──
  sectionGap: {
    gap: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  sectionCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 12,
  },
  exerciseImageWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e2020',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  exerciseMeta: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  // ── Coach Pro Tip ──
  coachCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  coachRow: {
    flexDirection: 'row',
  },
  coachAccent: {
    width: 6,
    backgroundColor: '#abd600',
  },
  coachBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  coachLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  coachText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // ── Fixed Bottom Button ──
  bottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    backgroundColor: '#000',
  },
  bottomGradient2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  bottomContent: {
    paddingHorizontal: PADDING_H,
    paddingBottom: 32,
    paddingTop: 16,
  },

  // ── Timer Overlay ──
  timerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 50,
  },

  // Completion screen
  completionWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_H,
    marginTop: -48,
  },
  completionIcon: {
    textShadowColor: Colors.brandVolt,
    textShadowRadius: 15,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#e2e2e2',
    letterSpacing: -0.4,
    marginTop: 24,
  },
  completionText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    maxWidth: 280,
  },
  completionStatsCard: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    marginTop: 24,
  },
  statRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
  },
  statLabel2: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue2: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.brandVolt,
    marginTop: 4,
  },

  // Active exercise screen
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: PADDING_H,
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandVolt,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_H,
    marginTop: -64,
  },
  activeExerciseImageContainer: {
    width: 192,
    height: 192,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.brandVolt,
    shadowColor: Colors.brandVolt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  activeExerciseImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  activeExerciseInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  exerciseCounter: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandVolt,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activeExerciseName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#e2e2e2',
    letterSpacing: -0.4,
    marginTop: 8,
  },
  activeExerciseType: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  timerRingContainer: {
    width: 128,
    height: 128,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  timerText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#e2e2e2',
    letterSpacing: -0.8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 40,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  footerArea: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '500',
  },
});
