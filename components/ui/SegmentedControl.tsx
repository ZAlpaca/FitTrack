import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from './AppText';

export function SegmentedControl({
  tabs,
  activeIndex,
  onChange,
}: {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onChange(i)}
          activeOpacity={0.7}
          style={[styles.tab, i === activeIndex && styles.tabActive]}
        >
          <AppText
            style={[styles.tabText, i === activeIndex && styles.tabTextActive]}
          >
            {tab}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: '#CCFF00',
  },
  tabText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'rgba(255,255,255,0.6)',
  },
  tabTextActive: {
    color: '#000000',
  },
});
