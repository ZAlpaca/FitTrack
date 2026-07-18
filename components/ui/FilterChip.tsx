import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from './AppText';

export function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.base, active ? styles.active : styles.inactive]}
    >
      <AppText style={[styles.text, active ? styles.textActive : styles.textInactive]}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  active: {
    backgroundColor: '#CCFF00',
    borderColor: '#CCFF00',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textActive: {
    color: '#000000',
  },
  textInactive: {
    color: 'rgba(255,255,255,0.6)',
  },
});
