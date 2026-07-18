/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Workout } from '../types';

interface WorkoutsTabProps {
  workouts: Workout[];
  onSelectWorkout: (id: string) => void;
}

export const WorkoutsTab: React.FC<WorkoutsTabProps> = ({ workouts, onSelectWorkout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'>('ALL');

  // Map intensity enum to simplified difficulties
  const getDifficulty = (intensity: string): 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' => {
    if (intensity === 'EASY' || intensity === 'CALM') return 'BEGINNER';
    if (intensity === 'MEDIUM') return 'INTERMEDIATE';
    return 'EXPERT'; // HARD, ELITE
  };

  // Filter workouts based on search and selected level
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());

    const workoutDiff = getDifficulty(workout.intensity);
    const matchesDifficulty = selectedDifficulty === 'ALL' || workoutDiff === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  // Main Category tiles for bento style
  const categories = [
    {
      id: 'hiit',
      title: 'HIIT',
      duration: '25 MIN',
      difficulty: 'HARD',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCla54oiBmNId_SjZuPf0jz0WrJNsJgf8Y0suR9Wo29gbNEb2ahiq246wjIDbHiADbM0zlrcZ1UPk5bfQ2YTGZP1zj7d0E0LC7Dg3nBv1DdAlANw9HhPxNpwG2sQvTNKXCpJ3Vr_-RefK7cF0odhyPhEWK9GlOieewi7QlsFQs_MWLUhwnlMfN4yJTv9hx4Sq204-i55rIawgujYixbTFKLoEr0N8T6-z4zmAGRQ8rRjCfhyDCs0pEyggF5xq46cDV4zSPwAsYz9JY',
      workoutId: 'workout-morning-hiit'
    },
    {
      id: 'strength',
      title: 'Strength',
      duration: '45 MIN',
      difficulty: 'ELITE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABGRG_BQLtDcZOpaGMhU19JpxtE6w-0b12w2wR1bpIwBaasg-IxCFvdrQKFvZUNT00-IwUScA9v9cCIYPa5Rqg0v2lOhOHYTW8ks-4DUJsoIBFw21p36gh2B1zTq8r7IYl-VFowazYp1hA4lEt5Ma1kObE4nw4CxZng9jG6jjUNxVfTY0n3QzrrOR_Pc_FSdEcoYQ8lOPAEuwY6KWNxe61DUtyCaRu7as4xwxPAaaLI-HeOHy19uezmYZHB8DVhFTuzEx2cm-VkPI',
      workoutId: 'workout-full-body-power'
    },
    {
      id: 'yoga',
      title: 'Zen Yoga',
      duration: '30 MIN',
      difficulty: 'CALM',
      desc: 'Restorative flow for mental clarity.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxo_JKafPwCHZzJC4F1vHgMEjlQpqdROgbRcgbnC1hQ3Bs_3c1eoWtT54k6TsMMzsiV4xvBtZeRcWmbu5lqbEWJTREuEUQ6N4pZxu-i1nBawhJP7qKS8uy1-qPzbMBi65ElZOfPgYy8aOi90G-F9M5BDlC6TRes9O86--4Io43PaoSNcMOuS_jlrAvYp1MMPSmphbHI_LvfQKUG0GntmrLJodI_OJhptU372N7bo6_sj4nSBjBrXWV3gaHmUaY6TlWgfEj_HJ_gk',
      workoutId: 'workout-zen-yoga'
    },
    {
      id: 'cycling',
      title: 'Cycling',
      duration: '40 MIN',
      difficulty: 'MEDIUM',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJP1UwFAyBackuyqu-TjbA_fpiatD543gyEjeEf3l7md_dNEe6JJMLlrhbAf47Zbp98mMyQPUtTPllcIusicgYsVNGdzrby3AHQcI0hfNRNZpt_-qyJ98XuF4i9IRo-60wQt531LInaFiGRrMh7HJITT4jKE3208_e0doWQdFX3DvrGWpt4YxuAFPVKcPzzRlEIPnioQMzWDSDR5Ig4hjQlQjWGryv_Cn3wR0iRw7-8NQMLpW8Tcj2VfO5nub6BAa445NSrdbXdg',
      workoutId: 'workout-cycling-volt'
    },
    {
      id: 'mobility',
      title: 'Mobility',
      duration: '15 MIN',
      difficulty: 'EASY',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI681M52lNgyZsmuHHoWRorGsF7CpaXEQW1m40-AFkQuvw8KLMDfmmWx--AKZxR_h-p4T2b6NpmFYGpofCE2taWNHaNNOWcH8_UEOGCdq__4PAADpK5FE1REsCUrNpaSHIwvpjO-pkxPrK70PHWFAMfzfvKngFLNkNbhUmprwxLNgA4PGb9bYxW75kGBsmkG3GrQsML6FPyqfKbPmsvSs78-BfanGM28Y9ziwGxeX_-5n37EpKEl2BEKSgDA5KOsHs2WwY-LEJli8',
      workoutId: 'workout-joint-mobility'
    }
  ];

  return (
    <div className="pb-32 pt-20 px-5 max-w-lg mx-auto text-[#e2e2e2]">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl flex justify-between items-center px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-brand-volt material-symbols-fill text-2xl">
            fitness_center
          </span>
          <h1 className="text-lg font-bold text-white tracking-tight">Workouts</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform text-white">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </header>

      {/* Search Bar */}
      <section className="mt-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            search
          </span>
          <input
            className="w-full bg-white/10 border border-white/5 rounded-full py-3.5 pl-12 pr-6 text-sm font-medium text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-volt focus:bg-white/15 transition-all"
            placeholder="Search workouts, trainers, categories..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </section>

      {/* Filters (Chips) */}
      <section className="flex gap-2.5 overflow-x-auto hide-scrollbar mt-4 py-1">
        {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'EXPERT'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-5 py-2 rounded-full font-bold text-xs tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedDifficulty === diff
                ? 'bg-brand-volt text-black'
                : 'bg-white/10 text-white border border-white/5 hover:bg-white/20'
            }`}
          >
            {diff}
          </button>
        ))}
      </section>

      {/* Bento Grid layout or search results */}
      {searchQuery === '' && selectedDifficulty === 'ALL' ? (
        <>
          {/* Main Bento Category Grid */}
          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const isLarge = cat.id === 'yoga'; // full width Zen Yoga
              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectWorkout(cat.workoutId)}
                  className={`relative h-64 rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 active:scale-[0.98] ${
                    isLarge ? 'col-span-1 md:col-span-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={cat.imageUrl}
                      alt={cat.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                    <div className="glass-card p-4 rounded-xl flex flex-col gap-1 transition-colors duration-300 group-hover:bg-white/10">
                      <h2 className="text-xl font-bold text-white tracking-tight">{cat.title}</h2>
                      {cat.desc && <p className="text-[12px] text-white/50 leading-snug mb-1">{cat.desc}</p>}
                      <div className="flex items-center gap-3 text-xs text-brand-volt-dim font-bold">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">schedule</span>
                          {cat.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">bolt</span>
                          {cat.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        /* Render filtered workout list */
        <section className="mt-6 space-y-4">
          <p className="text-xs text-white/40 font-semibold tracking-wider uppercase px-1">
            SEARCH RESULTS ({filteredWorkouts.length})
          </p>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => onSelectWorkout(workout.id)}
                className="glass-card p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors active:scale-98 duration-200"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={workout.imageUrl}
                    alt={workout.title}
                  />
                </div>
                <div className="flex-grow">
                  <span className="px-2 py-0.5 rounded bg-brand-volt/15 text-brand-volt font-bold text-[8px] uppercase tracking-wider mb-1 inline-block">
                    {workout.category}
                  </span>
                  <h3 className="text-md font-bold text-white tracking-tight">
                    {workout.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {workout.durationMin}m
                    </span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="text-brand-volt-dim font-semibold text-[10px]">
                      {workout.intensity}
                    </span>
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/40">chevron_right</span>
              </div>
            ))
          ) : (
            <div className="glass-card p-8 rounded-2xl text-center text-white/40">
              <span className="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
              <p className="text-sm">No workouts match your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('ALL');
                }}
                className="mt-3 text-xs font-bold text-brand-volt uppercase underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* Featured Section */}
      <section className="mt-8 mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight mb-4">Daily Recommendation</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <div className="w-full aspect-video rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbR4_-8k7Fl-pFUwzhhxJcMfjU_pLsaA8AaK_EKwfofQ89XwYO6l87blP7vs0ILK_F4ldvzhhiKzeOYzwI1OxbUD4txqnxjYqqtEoTVvZcpfa2xf1DV34rQSFy2TJ_QVkPVENSJl3XkOVipYtZAam6FpgZHfSPa2y_KyvC1MPfiYT8w4o1oyEzApTd1p_9NYvEd4pgYoGI0yaBgAunEM2sRrhIbgcxiQEg9Xk7kgIV_IScIR1R1G1kTL-Ar3bSZAfXJyz86TRVKkg"
              alt="Coach Recommendation"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            <div className="absolute top-3 left-3 bg-brand-volt text-black px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider">
              COACH'S PICK
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold text-white">Morning Power Flow</h4>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Start your day with this balanced routine of explosive strength and deep mobility work. Carefully designed by Coach Alex Thorne to lock in core integrity.
            </p>
            <button
              onClick={() => onSelectWorkout('workout-morning-hiit')}
              className="mt-4 w-full bg-brand-volt text-black py-2.5 rounded-full font-bold text-xs tracking-widest active:scale-95 transition-all volt-glow-button hover:bg-[#b5e000]"
            >
              START NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
