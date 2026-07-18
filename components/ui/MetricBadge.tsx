import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface MetricBadgeProps {
  /** MaterialCommunityIcons icon name */
  icon: string;
  /** Primary metric value */
  value: string | number;
  /** Optional unit suffix (e.g. "kg", "mins") */
  unit?: string;
  /** Label shown below the value in caps */
  label: string;
  /** Accent color for the icon and value (default: brand-volt) */
  accentColor?: string;
}

export function MetricBadge({
  icon,
  value,
  unit,
  label,
  accentColor = '#CCFF00',
}: MetricBadgeProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={accentColor} />

      <View style={styles.valueRow}>
        <AppText style={[styles.valueText, { color: accentColor }]}>
          {value}
        </AppText>
        {unit ? (
          <AppText style={styles.unitText}>
            {unit}
          </AppText>
        ) : null}
      </View>

      <AppText style={styles.labelText}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  valueText: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 34,
  },
  unitText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },
});

export default MetricBadge;
