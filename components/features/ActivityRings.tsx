import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ActivityRingsProps {
  movePercent: number;
  exercisePercent: number;
  standPercent: number;
}

const RING_CONFIG = {
  move: { radius: 44, strokeWidth: 5, color: '#fa114f' as const },
  exercise: { radius: 37, strokeWidth: 7, color: '#CCFF00' as const },
  stand: { radius: 30, strokeWidth: 9, color: '#00e5ff' as const },
} as const;

const CIRCUMFERENCES = {
  move: 2 * Math.PI * RING_CONFIG.move.radius,
  exercise: 2 * Math.PI * RING_CONFIG.exercise.radius,
  stand: 2 * Math.PI * RING_CONFIG.stand.radius,
};

function clamp(p: number): number {
  'worklet';
  return Math.min(100, Math.max(0, p));
}

export function ActivityRings({
  movePercent,
  exercisePercent,
  standPercent,
}: ActivityRingsProps) {
  const moveProgress = useSharedValue(0);
  const exerciseProgress = useSharedValue(0);
  const standProgress = useSharedValue(0);

  const animConfig = { duration: 1000, easing: Easing.out(Easing.cubic) };

  useEffect(() => {
    moveProgress.value = withTiming(clamp(movePercent) / 100, animConfig);
  }, [movePercent]);

  useEffect(() => {
    exerciseProgress.value = withTiming(clamp(exercisePercent) / 100, animConfig);
  }, [exercisePercent]);

  useEffect(() => {
    standProgress.value = withTiming(clamp(standPercent) / 100, animConfig);
  }, [standPercent]);

  const moveAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCES.move - moveProgress.value * CIRCUMFERENCES.move,
  }));
  const exerciseAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCES.exercise - exerciseProgress.value * CIRCUMFERENCES.exercise,
  }));
  const standAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCES.stand - standProgress.value * CIRCUMFERENCES.stand,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.ringsWrapper}>
        <Svg width={256} height={256} viewBox="0 0 100 100">
          <G transform="rotate(-90 50 50)">
            {/* Move — outer ring */}
            <Circle
              cx={50}
              cy={50}
              r={RING_CONFIG.move.radius}
              stroke={RING_CONFIG.move.color}
              strokeWidth={RING_CONFIG.move.strokeWidth}
              strokeOpacity={0.15}
              fill="none"
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx={50}
              cy={50}
              r={RING_CONFIG.move.radius}
              stroke={RING_CONFIG.move.color}
              strokeWidth={RING_CONFIG.move.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCES.move}
              animatedProps={moveAnimatedProps}
            />

            {/* Exercise — middle ring */}
            <Circle
              cx={50}
              cy={50}
              r={RING_CONFIG.exercise.radius}
              stroke={RING_CONFIG.exercise.color}
              strokeWidth={RING_CONFIG.exercise.strokeWidth}
              strokeOpacity={0.15}
              fill="none"
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx={50}
              cy={50}
              r={RING_CONFIG.exercise.radius}
              stroke={RING_CONFIG.exercise.color}
              strokeWidth={RING_CONFIG.exercise.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCES.exercise}
              animatedProps={exerciseAnimatedProps}
            />

            {/* Stand — inner ring */}
            <Circle
              cx={50}
              cy={50}
              r={RING_CONFIG.stand.radius}
              stroke={RING_CONFIG.stand.color}
              strokeWidth={RING_CONFIG.stand.strokeWidth}
              strokeOpacity={0.15}
              fill="none"
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx={50}
              cy={50}
              r={RING_CONFIG.stand.radius}
              stroke={RING_CONFIG.stand.color}
              strokeWidth={RING_CONFIG.stand.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCES.stand}
              animatedProps={standAnimatedProps}
            />
          </G>
        </Svg>

        {/* Center bolt icon */}
        <View style={styles.iconContainer} pointerEvents="none">
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={36}
            color={RING_CONFIG.exercise.color}
          />
        </View>
      </View>

      {/* Ring legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: RING_CONFIG.move.color }]} />
          <Text style={styles.legendText}>
            Move ({Math.round(clamp(movePercent))}%)
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: RING_CONFIG.exercise.color }]} />
          <Text style={styles.legendText}>
            Exercise ({Math.round(clamp(exercisePercent))}%)
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: RING_CONFIG.stand.color }]} />
          <Text style={styles.legendText}>
            Stand ({Math.round(clamp(standPercent))}%)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  ringsWrapper: {
    width: 256,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: 'rgba(226, 226, 226, 0.6)',
  },
});
