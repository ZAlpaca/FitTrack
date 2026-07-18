import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppContext } from '@/hooks/use-app-context';
import { CalendarGrid } from '@/components/ui/CalendarGrid';

export default function CalendarScreen() {
  const { state } = useAppContext();
  const { calendarSessions } = state;
  const [selectedDay, setSelectedDay] = useState(8);

  const completedCount = calendarSessions.filter((s) => s.isCompleted).length;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* Calendar Grid */}
      <View style={styles.calendarSection}>
        <CalendarGrid
          sessions={calendarSessions}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          month="October 2024"
          completedCount={completedCount}
        />
      </View>

      {/* Streak + Intensity Cards */}
      <View style={styles.cardsRow}>
        <View style={styles.miniCard}>
          <MaterialCommunityIcons name="fire" size={24} color="#CCFF00" style={styles.miniCardIcon} />
          <View style={styles.miniCardBody}>
            <AppText style={styles.miniCardLabel}>Streak</AppText>
            <AppText style={styles.miniCardValue}>12 Days</AppText>
          </View>
        </View>

        <View style={styles.miniCard}>
          <MaterialCommunityIcons name="speedometer" size={24} color="#CCFF00" style={styles.miniCardIcon} />
          <View style={styles.miniCardBody}>
            <AppText style={styles.miniCardLabel}>Intensity</AppText>
            <AppText style={styles.miniCardValue}>+14%</AppText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  calendarSection: {
    marginBottom: 32,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  miniCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  miniCardIcon: {
    marginBottom: 4,
  },
  miniCardBody: {
    marginTop: 8,
  },
  miniCardLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  miniCardValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#e2e2e2',
  },
});
