import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import * as Haptics from 'expo-haptics';

interface VoltButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'glass';
}

export function VoltButton({ title, onPress, disabled, variant = 'primary' }: VoltButtonProps) {
  const isPrimary = variant === 'primary';

  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.glass,
        disabled && styles.disabled,
      ]}
    >
      <AppText style={[styles.text, isPrimary ? styles.textPrimary : styles.textGlass]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#CCFF00',
    shadowColor: '#CCFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  textPrimary: {
    color: '#000000',
  },
  textGlass: {
    color: '#e2e2e2',
  },
});

export default VoltButton;
