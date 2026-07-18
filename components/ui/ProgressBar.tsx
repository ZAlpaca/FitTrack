import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  /** 0–100 fill percentage */
  percent: number;
  /** Bar height in px (default: 8) */
  height?: number;
  /** Whether to show the brand-volt glow shadow on the fill (default: true) */
  glow?: boolean;
}

export function ProgressBar({
  percent,
  height = 8,
  glow = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%` as unknown as number,
            height,
            ...(glow && clamped > 0
              ? { shadowColor: '#CCFF00', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 3 }
              : {}),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: '#CCFF00',
    borderRadius: 999,
  },
});

export default ProgressBar;
