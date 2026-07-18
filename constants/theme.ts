import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Kinetic Noir is dark-only, so light=dark
    background: '#000000',
    surface: '#121414',
    surfaceContainer: '#1e2020',
    accent: '#CCFF00',
    'accent-dim': '#abd600',
    'brand-red': '#fa114f',
    'brand-blue': '#00e5ff',
    text: '#e2e2e2',
    textMuted: 'rgba(255,255,255,0.4)',
    glassBg: 'rgba(255,255,255,0.05)',
    glassBorder: 'rgba(255,255,255,0.1)',
    error: '#ffb4ab',
    tint: '#CCFF00',
    icon: '#e2e2e2',
    tabIconDefault: 'rgba(255,255,255,0.4)',
    tabIconSelected: '#CCFF00',
  },
  dark: {
    // same palette
    background: '#000000',
    surface: '#121414',
    surfaceContainer: '#1e2020',
    accent: '#CCFF00',
    'accent-dim': '#abd600',
    'brand-red': '#fa114f',
    'brand-blue': '#00e5ff',
    text: '#e2e2e2',
    textMuted: 'rgba(255,255,255,0.4)',
    glassBg: 'rgba(255,255,255,0.05)',
    glassBorder: 'rgba(255,255,255,0.1)',
    error: '#ffb4ab',
    tint: '#CCFF00',
    icon: '#e2e2e2',
    tabIconDefault: 'rgba(255,255,255,0.4)',
    tabIconSelected: '#CCFF00',
  },
  // Direct access tokens (for use without color scheme)
  brandVolt: '#CCFF00',
  brandRed: '#fa114f',
  brandBlue: '#00e5ff',
  voltDim: '#abd600',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Inter',
    serif: 'ui-serif',
    rounded: 'Inter',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Inter',
    serif: 'serif',
    rounded: 'Inter',
    mono: 'monospace',
  },
  web: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    serif: "Georgia, serif",
    rounded: "'Inter', sans-serif",
    mono: "SFMono-Regular, Menlo, monospace",
  },
});

export const BorderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  section: 32,
};

// Typography presets
export const Typography = {
  displayXL: { fontSize: 48, fontWeight: '800' as const, letterSpacing: -0.04, lineHeight: 56 },
  metricXL: { fontSize: 40, fontWeight: '800' as const, letterSpacing: -0.02, lineHeight: 40 },
  headlineLG: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.02, lineHeight: 34 },
  titleMD: { fontSize: 18, fontWeight: '600' as const, letterSpacing: -0.01, lineHeight: 28 },
  bodySM: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  labelCaps: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 0.06, lineHeight: 16 },
};
