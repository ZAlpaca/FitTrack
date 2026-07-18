/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppTab, Goal, Workout, Device, PersonalRecord, CalendarSession } from './types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_GOALS,
  INITIAL_DEVICES,
  INITIAL_RECORDS,
  WORKOUT_ROUTINES,
  CALENDAR_OCTOBER_2024,
} from './mockData';

import { BottomNavBar } from './components/BottomNavBar';
import { DashboardTab } from './components/DashboardTab';
import { WorkoutsTab } from './components/WorkoutsTab';
import { StatsTab } from './components/StatsTab';
import { ProfileTab } from './components/ProfileTab';
import { WorkoutDetailView } from './components/WorkoutDetailView';

export default function App() {
  // Navigation & Sub-views State
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  // Core Athlete State
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(INITIAL_RECORDS);
  const [calendarSessions, setCalendarSessions] = useState<CalendarSession[]>(CALENDAR_OCTOBER_2024);

  // Dynamic Activity Rings Percents
  const [movePercent, setMovePercent] = useState(72);
  const [exercisePercent, setExercisePercent] = useState(55);
  const [standPercent, setStandPercent] = useState(40);
  const [stepsCount, setStepsCount] = useState(12482);

  // Quick Action menu visibility
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Log steps, calories, or other values on trigger
  const handleLogActivity = (type: 'steps' | 'calories' | 'water') => {
    if (type === 'steps') {
      setStepsCount((prev) => prev + 1500);
      setMovePercent((prev) => Math.min(100, prev + 8));
      setExercisePercent((prev) => Math.min(100, prev + 5));
    } else if (type === 'calories') {
      setExercisePercent((prev) => Math.min(100, prev + 10));
      setMovePercent((prev) => Math.min(100, prev + 6));
    } else if (type === 'water') {
      alert('Water log successfully synced: +250ml logged to Apple Health!');
    }
  };

  // Toggle Watch and Chest Straps state
  const handleToggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === id) {
          const nextStatus = dev.status === 'Synced' ? 'Disconnected' : 'Synced';
          return {
            ...dev,
            status: nextStatus,
            syncTimeText: nextStatus === 'Synced' ? 'Synced just now' : 'Disconnected',
            isActive: nextStatus === 'Synced',
          };
        }
        return dev;
      })
    );
  };

  // Log a new goal target
  const handleAddGoal = (newGoal: Goal) => {
    setGoals((prev) => [newGoal, ...prev]);
  };

  // Log a new personal record
  const handleAddRecord = (newRec: PersonalRecord) => {
    setPersonalRecords((prev) => [newRec, ...prev]);
  };

  // Simulate Workout Completion
  const handleCompleteWorkout = (calories: number, minutes: number) => {
    // 1. Update Profile counts
    setUserProfile((prev) => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      currentStreak: prev.currentStreak + 1,
    }));

    // 2. Advance Biometric Rings
    setMovePercent((prev) => Math.min(100, prev + 25));
    setExercisePercent((prev) => Math.min(100, prev + 35));
    setStandPercent((prev) => Math.min(100, prev + 15));
    setStepsCount((prev) => prev + 2800);

    // 3. Update active day completed dot in October calendar
    setCalendarSessions((prev) =>
      prev.map((session) => {
        if (session.dayNum === 8) {
          return {
            ...session,
            isCompleted: true,
            title: 'HIIT & Strength (Completed)',
            caloriesBurned: calories,
            durationMin: minutes,
            avgHr: 165,
            effortRating: 9.0,
          };
        }
        return session;
      })
    );

    // 4. Update the Sessions goal progress bar
    setGoals((prev) =>
      prev.map((g) => {
        if (goalIsStrengthOrSessions(g)) {
          const nextVal = g.currentValue + 1;
          const nextPercent = Math.min(100, Math.round((nextVal / g.targetValue) * 100));
          return {
            ...g,
            currentValue: nextVal,
            progressPercent: nextPercent,
            deadlineText: nextVal >= g.targetValue ? 'Goal Reached!' : `${nextVal} of ${g.targetValue} workouts`,
          };
        }
        return g;
      })
    );
  };

  const goalIsStrengthOrSessions = (g: Goal) => {
    return g.title.toLowerCase().includes('strength') || g.category === 'SESSIONS';
  };

  const selectedWorkout = WORKOUT_ROUTINES.find((w) => w.id === selectedWorkoutId);

  // Helper function to return to dashboard from detail view
  const handleBackToTab = () => {
    setSelectedWorkoutId(null);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#e2e2e2] relative overflow-x-hidden font-sans select-none pb-24">
      
      {/* Active Workout Detailed View (Takes precedence when selected) */}
      {selectedWorkout ? (
        <WorkoutDetailView
          workout={selectedWorkout}
          onBack={handleBackToTab}
          onCompleteWorkout={handleCompleteWorkout}
        />
      ) : (
        /* Standard Dashboard / Navigation Router Content */
        <>
          {activeTab === AppTab.DASHBOARD && (
            <DashboardTab
              user={userProfile}
              workouts={WORKOUT_ROUTINES}
              onSelectWorkout={setSelectedWorkoutId}
              onLogActivity={handleLogActivity}
              moveValue={movePercent}
              exerciseValue={exercisePercent}
              standValue={standPercent}
              stepsCount={stepsCount}
            />
          )}

          {activeTab === AppTab.WORKOUTS && (
            <WorkoutsTab
              workouts={WORKOUT_ROUTINES}
              onSelectWorkout={setSelectedWorkoutId}
            />
          )}

          {activeTab === AppTab.STATS && (
            <StatsTab
              goals={goals}
              onAddGoal={handleAddGoal}
              calendarSessions={calendarSessions}
              onSelectWorkout={setSelectedWorkoutId}
            />
          )}

          {activeTab === AppTab.PROFILE && (
            <ProfileTab
              user={userProfile}
              devices={devices}
              onToggleDevice={handleToggleDevice}
              personalRecords={personalRecords}
              onAddRecord={handleAddRecord}
            />
          )}

          {/* Floating Action Button (FAB) for Quick Simulations */}
          <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end">
            {showQuickMenu && (
              <div className="flex flex-col gap-2 mb-3 bg-[#1e2020] border border-white/10 p-3 rounded-2xl shadow-xl animate-fade-in text-xs font-semibold text-right">
                <button
                  onClick={() => {
                    handleLogActivity('steps');
                    setShowQuickMenu(false);
                  }}
                  className="flex items-center gap-2 justify-end text-brand-volt py-1 cursor-pointer hover:underline"
                >
                  <span>Quick Log +1,500 Steps</span>
                  <span className="material-symbols-outlined text-sm">directions_run</span>
                </button>
                <button
                  onClick={() => {
                    handleLogActivity('calories');
                    setShowQuickMenu(false);
                  }}
                  className="flex items-center gap-2 justify-end text-brand-volt py-1 cursor-pointer hover:underline"
                >
                  <span>Quick Log +150 kcal</span>
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                </button>
                <button
                  onClick={() => {
                    handleLogActivity('water');
                    setShowQuickMenu(false);
                  }}
                  className="flex items-center gap-2 justify-end text-brand-volt py-1 cursor-pointer hover:underline"
                >
                  <span>Log Water hydration</span>
                  <span className="material-symbols-outlined text-sm">local_drink</span>
                </button>
              </div>
            )}
            
            <button
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className="w-14 h-14 bg-brand-volt text-black rounded-full shadow-lg shadow-[#CCFF00]/30 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            >
              <span className={`material-symbols-outlined text-3xl font-black transition-transform duration-300 ${showQuickMenu ? 'rotate-45' : ''}`}>
                add
              </span>
            </button>
          </div>

          {/* Core iOS persistent bottom navigation bar */}
          <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </div>
  );
}
