import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppContext } from '@/hooks/use-app-context';
import type { Goal } from '@/constants/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ModalOverlay } from '@/components/ui/ModalOverlay';

const GOAL_CATEGORIES = ['CURRENT FOCUS', 'WEEKLY TARGET', 'SESSIONS'];

const GOAL_PERF_BARS = [
  { heightPct: 40, opacity: 0.2 },
  { heightPct: 65, opacity: 0.4 },
  { heightPct: 55, opacity: 0.3 },
  { heightPct: 80, opacity: 0.6 },
  { heightPct: 70, opacity: 0.5 },
  { heightPct: 95, opacity: 1 },
  { heightPct: 30, opacity: 0.1 },
];

export default function GoalsScreen() {
  const { state, actions } = useAppContext();
  const { goals } = state;
  const { addGoal } = actions;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SESSIONS');
  const [currentValue, setCurrentValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('workouts');

  const handleSubmit = () => {
    if (!title.trim() || !targetValue) return;

    const current = parseFloat(currentValue) || 0;
    const target = parseFloat(targetValue);
    const percent = Math.min(100, Math.round((current / target) * 100));

    const iconMap: Record<string, string> = {
      'CURRENT FOCUS': 'scale-bathroom',
      'WEEKLY TARGET': 'run-fast',
      SESSIONS: 'dumbbell',
    };

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      category: category as Goal['category'],
      title: title.trim(),
      currentValue: current,
      targetValue: target,
      unit,
      progressPercent: percent,
      deadlineText: `Target: ${target} ${unit}`,
      icon: iconMap[category] || 'trophy-award',
    };

    addGoal(newGoal);
    setTitle('');
    setCurrentValue('');
    setTargetValue('');
    setUnit('workouts');
    setShowModal(false);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>Your Goals</AppText>
        <AppText style={styles.headerSubtitle}>
          Stay focused. Peak performance requires precise objectives and persistent monitoring.
        </AppText>
      </View>

      {/* Goals Stack */}
      <View style={styles.goalsStack}>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalCard}>
            <View style={styles.goalCardTop}>
              <View style={styles.goalCardInfo}>
                <AppText style={styles.goalCategory}>{goal.category}</AppText>
                <AppText style={styles.goalTitle}>{goal.title}</AppText>
              </View>
              <AppText style={styles.goalPercent}>{goal.progressPercent}%</AppText>
            </View>

            <View style={styles.progressWrap}>
              <ProgressBar percent={goal.progressPercent} height={8} glow />
            </View>

            <View style={styles.goalMeta}>
              <AppText style={styles.goalMetaText}>
                {goal.currentValue} {goal.unit}
              </AppText>
              <AppText style={styles.goalMetaText}>{goal.deadlineText}</AppText>
            </View>

            {/* Background icon */}
            <View style={styles.goalBgIcon} pointerEvents="none">
              <MaterialCommunityIcons
                name={goal.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={100}
                color="#CCFF00"
              />
            </View>
          </View>
        ))}

        {/* Add New Goal Button */}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.addGoalBtn}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus-circle" size={32} color="rgba(255,255,255,0.5)" />
          <AppText style={styles.addGoalBtnText}>Add New Target Goal</AppText>
        </TouchableOpacity>
      </View>

      {/* Goal Performance Graph */}
      <View>
        <AppText style={styles.sectionTitle}>Goal Performance</AppText>
        <View style={styles.perfCard}>
          <View style={styles.perfBars}>
            {GOAL_PERF_BARS.map((bar, index) => {
              const barHeight = Math.round((bar.heightPct / 100) * 144);
              const isPeak = bar.opacity >= 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.perfBar,
                    {
                      height: barHeight,
                      backgroundColor: isPeak
                        ? '#CCFF00'
                        : `rgba(204,255,0,${Math.min(bar.opacity + 0.1, 0.6)})`,
                    },
                    isPeak ? styles.perfBarPeak : null,
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.perfDayLabels}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <AppText
                key={day}
                style={[styles.perfDayLabel, i === 5 && styles.perfDayLabelActive]}
              >
                {day}
              </AppText>
            ))}
          </View>
        </View>
      </View>

      {/* Add Goal Modal */}
      <ModalOverlay visible={showModal} onClose={() => setShowModal(false)} title="Set Target Goal">
        <View style={styles.modalContent}>
          {/* Goal Title */}
          <View>
            <AppText style={styles.modalLabel}>Goal Title</AppText>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Weight Loss, Daily Hydration"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={styles.textInput}
            />
          </View>

          {/* Category */}
          <View>
            <AppText style={styles.modalLabel}>Category Type</AppText>
            <View style={styles.categoryRow}>
              {GOAL_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[styles.categoryBtn, category === cat && styles.categoryBtnActive]}
                >
                  <AppText
                    style={[styles.categoryBtnText, category === cat && styles.categoryBtnTextActive]}
                  >
                    {cat === 'CURRENT FOCUS' ? 'FOCUS' : cat === 'WEEKLY TARGET' ? 'WEEKLY' : 'SESSIONS'}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Current / Target */}
          <View style={styles.inputRow}>
            <View style={styles.inputCol}>
              <AppText style={styles.modalLabel}>Current</AppText>
              <TextInput
                value={currentValue}
                onChangeText={setCurrentValue}
                placeholder="e.g. 172"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="decimal-pad"
                style={styles.textInput}
              />
            </View>
            <View style={styles.inputCol}>
              <AppText style={styles.modalLabel}>Target</AppText>
              <TextInput
                value={targetValue}
                onChangeText={setTargetValue}
                placeholder="e.g. 168"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="decimal-pad"
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Unit */}
          <View>
            <AppText style={styles.modalLabel}>Unit</AppText>
            <TextInput
              value={unit}
              onChangeText={setUnit}
              placeholder="e.g. lbs, mi, workouts"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={styles.textInput}
            />
          </View>

          {/* Submit */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn} activeOpacity={0.8}>
            <AppText style={styles.submitBtnText}>Create Goal Target</AppText>
          </TouchableOpacity>
        </View>
      </ModalOverlay>
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

  /* ── Header ── */
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    lineHeight: 18,
  },

  /* ── Goals Stack ── */
  goalsStack: {
    gap: 16,
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  goalCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    zIndex: 10,
    position: 'relative',
  },
  goalCardInfo: {
    flex: 1,
    marginRight: 12,
  },
  goalCategory: {
    fontSize: 9,
    fontWeight: '700',
    color: '#CCFF00',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  goalPercent: {
    fontSize: 24,
    fontWeight: '900',
    color: '#e2e2e2',
  },
  progressWrap: {
    marginBottom: 12,
  },
  goalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    position: 'relative',
  },
  goalMetaText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },
  goalBgIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },

  /* ── Add Goal Button ── */
  addGoalBtn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addGoalBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },

  /* ── Goal Performance ── */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e2e2',
    marginBottom: 12,
  },
  perfCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  perfBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 144,
    gap: 12,
  },
  perfBar: {
    flex: 1,
    borderRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  perfBarPeak: {
    shadowColor: '#CCFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  perfDayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 8,
  },
  perfDayLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.4)',
  },
  perfDayLabelActive: {
    color: '#CCFF00',
  },

  /* ── Modal ── */
  modalContent: {
    gap: 16,
  },
  modalLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#e2e2e2',
    fontSize: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryBtnActive: {
    backgroundColor: 'rgba(204,255,0,0.1)',
    borderColor: '#CCFF00',
  },
  categoryBtnText: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.5)',
  },
  categoryBtnTextActive: {
    color: '#CCFF00',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputCol: {
    flex: 1,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#CCFF00',
    paddingVertical: 12,
    borderRadius: 999,
    marginTop: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
