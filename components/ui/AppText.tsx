import { Text, TextProps } from 'react-native';
import { forwardRef } from 'react';

export const AppText = forwardRef<Text, TextProps>(({ style, ...props }, ref) => (
  <Text ref={ref} style={[{ color: '#e2e2e2' }, style]} {...props} />
));
AppText.displayName = 'AppText';
