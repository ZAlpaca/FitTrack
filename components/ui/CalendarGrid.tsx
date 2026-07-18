import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { GlassCard } from './GlassCard';
import { BodySM, LabelCaps, TitleMD } from './Typography';

interface CalendarSession {
  dayNum: number;
  isCompleted: boolean;
  title?: string;
  durationMin?: number;
  caloriesBurned?: number;
  avgHr?: number;
  effortRating?: number;
}

interface CalendarGridProps {
  sessions: CalendarSession[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  month?: string;
  completedCount?: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Get the number of days in a given month.
 * Month is 1-indexed (1 = January).
 */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day-of-week (0 = Sunday) for the first day of the month.
 */
function firstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Get trailing days from the previous month to fill the first row.
 */
function getTrailingDays(year: number, month: number): number[] {
  const firstWeekday = firstDayOfMonth(year, month);
  if (firstWeekday === 0) return []; // month starts on Sunday, no trailing days needed
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDays = daysInMonth(prevYear, prevMonth);
  const trailing: number[] = [];
  for (let i = prevMonthDays - firstWeekday + 1; i <= prevMonthDays; i++) {
    trailing.push(i);
  }
  return trailing;
}

function getCurrentMonthYear(): { year: number; month: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function CalendarGrid({
  sessions,
  selectedDay,
  onSelectDay,
  month,
  completedCount,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const { year, month: currentMonth } = getCurrentMonthYear();
  const totalDays = daysInMonth(year, currentMonth);
  const trailingDays = getTrailingDays(year, currentMonth);

  const sessionMap = new Map(sessions.map((s) => [s.dayNum, s]));
  const activeSession = sessionMap.get(selectedDay);

  return (
    <View style={styles.wrapper}>
      {/* Month Selector Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AppText style={styles.monthTitle}>
            {month || `${new Date(year, currentMonth).toLocaleString('default', { month: 'long' })} ${year}`}
          </AppText>
          {completedCount !== undefined && (
            <AppText style={styles.sessionCount}>
              {completedCount} Sessions Completed
            </AppText>
          )}
        </View>
        <View style={styles.navRow}>
          <TouchableOpacity
            onPress={onPrevMonth}
            style={styles.navButton}
            activeOpacity={0.7}
          >
            <AppText style={styles.navButtonText}>{'<'}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNextMonth}
            style={styles.navButton}
            activeOpacity={0.7}
          >
            <AppText style={styles.navButtonText}>{'>'}</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Day-of-week Labels */}
      <View style={styles.dayLabelsRow}>
        {DAY_LABELS.map((label) => (
          <View key={label} style={styles.dayLabelCell}>
            <AppText style={styles.dayLabelText}>
              {label}
            </AppText>
          </View>
        ))}
      </View>

      {/* Day Cells Grid — flexWrap with negative margins for consistent gaps */}
      <View style={styles.gridRow}>
        {/* Trailing days from previous month */}
        {trailingDays.map((day) => (
          <View
            key={`trailing-${day}`}
            style={styles.dayCell}
          >
            <View style={styles.trailingDayInner}>
              <AppText style={styles.trailingDayText}>{day}</AppText>
            </View>
          </View>
        ))}

        {/* Current month days */}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const session = sessionMap.get(day);
          const isSelected = selectedDay === day;

          return (
            <View key={day} style={styles.dayCell}>
              <TouchableOpacity
                onPress={() => onSelectDay(day)}
                activeOpacity={0.7}
                style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
              >
                <AppText
                  style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}
                >
                  {day}
                </AppText>
                {session?.isCompleted && (
                  <View style={styles.completedDot} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Session Detail Card */}
      <View>
        <View style={styles.sessionHeader}>
          <AppText style={styles.sessionDate}>
            {new Date(year, currentMonth, selectedDay).toLocaleString('default', { weekday: 'long' })}, {month?.split(' ')[0] || new Date(year, currentMonth).toLocaleString('default', { month: 'long' })} {selectedDay}
          </AppText>
          <View style={styles.sessionDivider} />
        </View>

        {activeSession?.isCompleted ? (
          <GlassCard>
            <View style={styles.sessionCard}>
              {/* Ambient glow */}
              <View style={styles.ambientGlow} />

              <View style={styles.sessionTopRow}>
                <View style={styles.sessionInfo}>
                  <TitleMD style={styles.sessionTitle}>
                    {activeSession.title || 'Workout Session'}
                  </TitleMD>
                  {activeSession.durationMin != null && (
                    <BodySM style={styles.sessionDuration}>
                      {activeSession.durationMin} min
                    </BodySM>
                  )}
                </View>
                <View style={styles.completedBadge}>
                  <AppText style={styles.completedBadgeText}>
                    COMPLETED
                  </AppText>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <LabelCaps style={styles.statLabel}>Calories</LabelCaps>
                  <View style={styles.statValueRow}>
                    <AppText style={styles.statValue}>
                      {activeSession.caloriesBurned ?? '—'}
                    </AppText>
                    <BodySM style={styles.statUnit}>kcal</BodySM>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <LabelCaps style={styles.statLabel}>Avg HR</LabelCaps>
                  <View style={styles.statValueRow}>
                    <AppText style={styles.statValue}>
                      {activeSession.avgHr ?? '—'}
                    </AppText>
                    <BodySM style={styles.statUnit}>bpm</BodySM>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <LabelCaps style={styles.statLabel}>Effort</LabelCaps>
                  <View style={styles.statValueRow}>
                    <AppText style={styles.statValueAccent}>
                      {activeSession.effortRating ?? '—'}
                    </AppText>
                    <BodySM style={styles.statUnit}>/10</BodySM>
                  </View>
                </View>
              </View>
            </View>
          </GlassCard>
        ) : (
          <GlassCard>
            <View style={styles.restDayCard}>
              <AppText style={styles.restDayIcon}>{'[ ]'}</AppText>
              <BodySM style={styles.restDayText}>Rest Day. No workout logged for this date.</BodySM>
            </View>
          </GlassCard>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  sessionCount: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  navRow: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  navButtonText: {
    color: '#e2e2e2',
    fontSize: 14,
    fontWeight: '700',
  },
  dayLabelsRow: {
    flexDirection: 'row',
    marginHorizontal: -3,
  },
  dayLabelCell: {
    width: '14.285%' as unknown as number,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  dayLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.5,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -3,
  },
  dayCell: {
    width: '14.285%' as unknown as number,
    paddingHorizontal: 3,
    marginBottom: 6,
  },
  trailingDayInner: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  trailingDayText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.2)',
  },
  dayButton: {
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dayButtonSelected: {
    borderColor: '#CCFF00',
    backgroundColor: 'rgba(204,255,0,0.1)',
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e2e2e2',
  },
  dayNumberSelected: {
    color: '#CCFF00',
    fontWeight: '700',
  },
  completedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CCFF00',
    marginTop: 4,
    shadowColor: '#CCFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sessionDate: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sessionDivider: {
    height: 1,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sessionCard: {
    position: 'relative',
  },
  ambientGlow: {
    position: 'absolute',
    right: -32,
    top: -32,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(204,255,0,0.05)',
  },
  sessionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  sessionInfo: {
    flex: 1,
    marginRight: 12,
  },
  sessionTitle: {
    color: '#e2e2e2',
    marginBottom: 2,
  },
  sessionDuration: {
    color: 'rgba(255,255,255,0.5)',
  },
  completedBadge: {
    backgroundColor: 'rgba(204,255,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(204,255,0,0.35)',
  },
  completedBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#CCFF00',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.3)',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e2e2e2',
  },
  statValueAccent: {
    fontSize: 18,
    fontWeight: '800',
    color: '#CCFF00',
  },
  statUnit: {
    color: 'rgba(255,255,255,0.4)',
    marginLeft: 2,
  },
  restDayCard: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  restDayIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: 'rgba(255,255,255,0.4)',
  },
  restDayText: {
    color: 'rgba(255,255,255,0.4)',
  },
});

export default CalendarGrid;
