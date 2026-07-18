import { TextProps, StyleSheet } from 'react-native';
import { AppText } from './AppText';

interface TypographyProps extends TextProps {}

export function DisplayXL({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.displayXL, style]} {...props}>
      {children}
    </AppText>
  );
}

export function MetricXL({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.metricXL, style]} {...props}>
      {children}
    </AppText>
  );
}

export function HeadlineLG({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.headlineLG, style]} {...props}>
      {children}
    </AppText>
  );
}

export function TitleMD({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.titleMD, style]} {...props}>
      {children}
    </AppText>
  );
}

export function BodySM({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.bodySM, style]} {...props}>
      {children}
    </AppText>
  );
}

export function LabelCaps({ children, style, ...props }: TypographyProps) {
  return (
    <AppText style={[styles.labelCaps, style]} {...props}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  displayXL: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 56,
  },
  metricXL: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 40,
  },
  headlineLG: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 34,
  },
  titleMD: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  bodySM: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  labelCaps: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
});
