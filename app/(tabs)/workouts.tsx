import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FilterChip } from '@/components/ui/FilterChip';
import { GlassCard } from '@/components/ui/GlassCard';
import { WORKOUT_ROUTINES } from '@/constants/mockData';
import { ScreenErrorBoundary } from '@/components/ui/ScreenErrorBoundary';

type Difficulty = 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

function getDifficulty(intensity: string): 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' {
  if (intensity === 'EASY' || intensity === 'CALM') return 'BEGINNER';
  if (intensity === 'MEDIUM') return 'INTERMEDIATE';
  return 'EXPERT';
}

const categories = [
  {
    id: 'hiit',
    title: 'HIIT',
    duration: '25 MIN',
    difficulty: 'HARD',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCla54oiBmNId_SjZuPf0jz0WrJNsJgf8Y0suR9Wo29gbNEb2ahiq246wjIDbHiADbM0zlrcZ1UPk5bfQ2YTGZP1zj7d0E0LC7Dg3nBv1DdAlANw9HhPxNpwG2sQvTNKXCpJ3Vr_-RefK7cF0odhyPhEWK9GlOieewi7QlsFQs_MWLUhwnlMfN4yJTv9hx4Sq204-i55rIawgujYixbTFKLoEr0N8T6-z4zmAGRQ8rRjCfhyDCs0pEyggF5xq46cDV4zSPwAsYz9JY',
    workoutId: 'workout-morning-hiit',
  },
  {
    id: 'strength',
    title: 'Strength',
    duration: '45 MIN',
    difficulty: 'ELITE',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABGRG_BQLtDcZOpaGMhU19JpxtE6w-0b12w2wR1bpIwBaasg-IxCFvdrQKFvZUNT00-IwUScA9v9cCIYPa5Rqg0v2lOhOHYTW8ks-4DUJsoIBFw21p36gh2B1zTq8r7IYl-VFowazYp1hA4lEt5Ma1kObE4nw4CxZng9jG6jjUNxVfTY0n3QzrrOR_Pc_FSdEcoYQ8lOPAEuwY6KWNxe61DUtyCaRu7as4xwxPAaaLI-HeOHy19uezmYZHB8DVhFTuzEx2cm-VkPI',
    workoutId: 'workout-full-body-power',
  },
  {
    id: 'yoga',
    title: 'Zen Yoga',
    duration: '30 MIN',
    difficulty: 'CALM',
    desc: 'Restorative flow for mental clarity.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxo_JKafPwCHZzJC4F1vHgMEjlQpqdROgbRcgbnC1hQ3Bs_3c1eoWtT54k6TsMMzsiV4xvBtZeRcWmbu5lqbEWJTREuEUQ6N4pZxu-i1nBawhJP7qKS8uy1-qPzbMBi65ElZOfPgYy8aOi90G-F9M5BDlC6TRes9O86--4Io43PaoSNcMOuS_jlrAvYp1MMPSmphbHI_LvfQKUG0GntmrLJodI_OJhptU372N7bo6_sj4nSBjBrXWV3gaHmUaY6TlWgfEj_HJ_gk',
    workoutId: 'workout-zen-yoga',
  },
  {
    id: 'cycling',
    title: 'Cycling',
    duration: '40 MIN',
    difficulty: 'MEDIUM',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJP1UwFAyBackuyqu-TjbA_fpiatD543gyEjeEf3l7md_dNEe6JJMLlrhbAf47Zbp98mMyQPUtTPllcIusicgYsVNGdzrby3AHQcI0hfNRNZpt_-qyJ98XuF4i9IRo-60wQt531LInaFiGRrMh7HJITT4jKE3208_e0doWQdFX3DvrGWpt4YxuAFPVKcPzzRlEIPnioQMzWDSDR5Ig4hjQlQjWGryv_Cn3wR0iRw7-8NQMLpW8Tcj2VfO5nub6BAa445NSrdbXdg',
    workoutId: 'workout-cycling-volt',
  },
  {
    id: 'mobility',
    title: 'Mobility',
    duration: '15 MIN',
    difficulty: 'EASY',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI681M52lNgyZsmuHHoWRorGsF7CpaXEQW1m40-AFkQuvw8KLMDfmmWx--AKZxR_h-p4T2b6NpmFYGpofCE2taWNHaNNOWcH8_UEOGCdq__4PAADpK5FE1REsCUrNpaSHIwvpjO-pkxPrK70PHWFAMfzfvKngFLNkNbhUmprwxLNgA4PGb9bYxW75kGBsmkG3GrQsML6FPyqfKbPmsvSs78-BfanGM28Y9ziwGxeX_-5n37EpKEl2BEKSgDA5KOsHs2WwY-LEJli8',
    workoutId: 'workout-joint-mobility',
  },
];

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 32 },
  imageFill: { flex: 1 },
  imageFull: { width: '100%', height: '100%' },

  /* ── Header ── */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  calendarBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  /* ── Search Bar ── */
  searchWrap: { marginTop: 8 },
  searchIconWrap: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 10,
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 9999,
    paddingVertical: 14,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#ffffff',
  },
  searchCloseWrap: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 10,
  },

  /* ── Filter Chips ── */
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingVertical: 4,
  },

  /* ── Category Grid ── */
  categoryGrid: { marginTop: 24, gap: 16 },
  categoryCard: {
    position: 'relative',
    height: 256,
    borderRadius: 24,
    overflow: 'hidden',
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  categoryGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  categoryGlassWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryGlassPanel: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  categoryDesc: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 16,
    marginBottom: 4,
  },
  categoryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  categoryMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryMetaText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#abd600',
  },

  /* ── Daily Recommendation ── */
  dailySection: { marginTop: 32, marginBottom: 32 },
  dailySectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  dailyImageWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  dailyImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  coachBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#CCFF00',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  coachBadgeText: {
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dailyWorkoutName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
  },
  dailyDesc: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    lineHeight: 18,
  },
  startNowBtn: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#CCFF00',
    paddingVertical: 12,
    borderRadius: 9999,
    alignItems: 'center',
  },
  startNowBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  /* ── Search Results ── */
  searchResultsSection: { marginTop: 24, gap: 16 },
  searchResultsHeader: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
  },
  resultImageWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultContent: { flex: 1 },
  resultBadge: {
    backgroundColor: 'rgba(204,255,0,0.15)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  resultBadgeText: {
    color: '#CCFF00',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  resultMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  resultMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  resultMetaText: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.5)',
  },
  resultIntensity: {
    color: '#abd600',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontSize: 10,
  },

  /* ── Empty State ── */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
  clearBtn: { marginTop: 12 },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#CCFF00',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
});

export default function WorkoutsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('ALL');

  const filteredWorkouts = WORKOUT_ROUTINES.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());

    const workoutDiff = getDifficulty(workout.intensity);
    const matchesDifficulty =
      selectedDifficulty === 'ALL' || workoutDiff === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  const isDefaultView = searchQuery === '' && selectedDifficulty === 'ALL';

  return (
    <ScreenErrorBoundary name="Workouts">
      <SafeAreaView style={styles.root} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={24}
                color="#CCFF00"
              />
              <AppText style={styles.headerTitle}>
                Workouts
              </AppText>
            </View>
            <TouchableOpacity style={styles.calendarBtn}>
              <MaterialCommunityIcons name="calendar-today" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchWrap}>
            <View style={styles.searchIconWrap}>
              <MaterialCommunityIcons
                name="magnify"
                size={18}
                color="rgba(255,255,255,0.4)"
              />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search workouts, trainers, categories..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.searchCloseWrap}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={18}
                  color="rgba(255,255,255,0.4)"
                />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filter Chips */}
          <View style={styles.filterRow}>
            {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'EXPERT'] as const).map(
              (diff) => (
                <FilterChip
                  key={diff}
                  label={diff}
                  active={selectedDifficulty === diff}
                  onPress={() => setSelectedDifficulty(diff)}
                />
              ),
            )}
          </View>

          {isDefaultView ? (
            <>
              {/* Category Bento Grid */}
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => router.push(`/workout/${cat.workoutId}`)}
                    activeOpacity={0.9}
                    style={styles.categoryCard}
                  >
                    <Image
                      source={{ uri: cat.imageUrl }}
                      style={styles.imageFill}
                      contentFit="cover"
                    />
                    {/* Gradient overlay */}
                    <View style={styles.categoryOverlay} />
                    <View style={styles.categoryGradient} />
                    {/* Glass overlay at bottom */}
                    <View style={styles.categoryGlassWrap}>
                      <View style={styles.categoryGlassPanel}>
                        <AppText style={styles.categoryTitle}>
                          {cat.title}
                        </AppText>
                        {cat.desc && (
                          <AppText style={styles.categoryDesc}>
                            {cat.desc}
                          </AppText>
                        )}
                        <View style={styles.categoryMetaRow}>
                          <View style={styles.categoryMetaItem}>
                            <MaterialCommunityIcons
                              name="clock-outline"
                              size={14}
                              color="#abd600"
                            />
                            <AppText style={styles.categoryMetaText}>
                              {cat.duration}
                            </AppText>
                          </View>
                          <View style={styles.categoryMetaItem}>
                            <MaterialCommunityIcons
                              name="lightning-bolt"
                              size={14}
                              color="#abd600"
                            />
                            <AppText style={styles.categoryMetaText}>
                              {cat.difficulty}
                            </AppText>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Daily Recommendation */}
              <View style={styles.dailySection}>
                <AppText style={styles.dailySectionTitle}>
                  Daily Recommendation
                </AppText>
                <GlassCard>
                  <View style={styles.dailyImageWrap}>
                    <Image
                      source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbR4_-8k7Fl-pFUwzhhxJcMfjU_pLsaA8AaK_EKwfofQ89XwYO6l87blP7vs0ILK_F4ldvzhhiKzeOYzwI1OxbUD4txqnxjYqqtEoTVvZcpfa2xf1DV34rQSFy2TJ_QVkPVENSJl3XkOVipYtZAam6FpgZHfSPa2y_KyvC1MPfiYT8w4o1oyEzApTd1p_9NYvEd4pgYoGI0yaBgAunEM2sRrhIbgcxiQEg9Xk7kgIV_IScIR1R1G1kTL-Ar3bSZAfXJyz86TRVKkg',
                      }}
                      style={styles.imageFill}
                      contentFit="cover"
                    />
                    <View style={styles.dailyImageOverlay} />
                    <View style={styles.coachBadge}>
                      <AppText style={styles.coachBadgeText}>
                        COACH'S PICK
                      </AppText>
                    </View>
                  </View>
                  <AppText style={styles.dailyWorkoutName}>
                    Morning Power Flow
                  </AppText>
                  <AppText style={styles.dailyDesc}>
                    Start your day with this balanced routine of explosive strength
                    and deep mobility work. Carefully designed by Coach Alex Thorne
                    to lock in core integrity.
                  </AppText>
                  <TouchableOpacity
                    onPress={() => router.push('/workout/workout-morning-hiit')}
                    style={styles.startNowBtn}
                  >
                    <AppText style={styles.startNowBtnText}>
                      START NOW
                    </AppText>
                  </TouchableOpacity>
                </GlassCard>
              </View>
            </>
          ) : (
            /* Search Results */
            <View style={styles.searchResultsSection}>
              <AppText style={styles.searchResultsHeader}>
                SEARCH RESULTS ({filteredWorkouts.length})
              </AppText>
              {filteredWorkouts.length > 0 ? (
                filteredWorkouts.map((workout) => (
                  <TouchableOpacity
                    key={workout.id}
                    onPress={() => router.push(`/workout/${workout.id}`)}
                    activeOpacity={0.7}
                    style={styles.resultCard}
                  >
                    <View style={styles.resultImageWrap}>
                      <Image
                        source={{ uri: workout.imageUrl }}
                        style={styles.imageFull}
                        contentFit="cover"
                      />
                    </View>
                    <View style={styles.resultContent}>
                      <View style={styles.resultBadge}>
                        <AppText style={styles.resultBadgeText}>
                          {workout.category}
                        </AppText>
                      </View>
                      <AppText style={styles.resultTitle}>
                        {workout.title}
                      </AppText>
                      <View style={styles.resultMetaRow}>
                        <View style={styles.resultMetaItem}>
                          <MaterialCommunityIcons
                            name="clock-outline"
                            size={13}
                            color="rgba(255,255,255,0.5)"
                          />
                          <AppText style={styles.resultMetaText}>
                            {workout.durationMin}m
                          </AppText>
                        </View>
                        <View style={styles.resultMetaItem}>
                          <MaterialCommunityIcons
                            name="fire"
                            size={13}
                            color="rgba(255,255,255,0.5)"
                          />
                          <AppText style={styles.resultMetaText}>
                            {workout.caloriesBurned} kcal
                          </AppText>
                        </View>
                        <AppText style={styles.resultIntensity}>
                          {workout.intensity}
                        </AppText>
                      </View>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color="rgba(255,255,255,0.4)"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                /* Empty State */
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons
                    name="emoticon-sad-outline"
                    size={36}
                    color="rgba(255,255,255,0.4)"
                  />
                  <AppText style={styles.emptyText}>
                    No workouts match your criteria.
                  </AppText>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery('');
                      setSelectedDifficulty('ALL');
                    }}
                    style={styles.clearBtn}
                  >
                    <AppText style={styles.clearFiltersText}>
                      Clear Filters
                    </AppText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenErrorBoundary>
  );
}
