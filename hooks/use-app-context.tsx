/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile, Goal, Device, PersonalRecord, CalendarSession } from '@/constants/types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_GOALS,
  INITIAL_DEVICES,
  INITIAL_RECORDS,
  CALENDAR_OCTOBER_2024,
} from '@/constants/mockData';

interface ActivityRings {
  move: number;
  exercise: number;
  stand: number;
}

interface AppState {
  userProfile: UserProfile;
  goals: Goal[];
  devices: Device[];
  personalRecords: PersonalRecord[];
  calendarSessions: CalendarSession[];
  activityRings: ActivityRings;
  stepsCount: number;
  heartRate: number;
}

interface AppActions {
  logActivity: (type: 'steps' | 'calories' | 'water') => void;
  toggleDevice: (id: string) => void;
  addGoal: (goal: Goal) => void;
  addRecord: (record: PersonalRecord) => void;
  completeWorkout: (calories: number, minutes: number) => void;
}

interface AppContextValue {
  state: AppState;
  actions: AppActions;
}

const AppContext = createContext<AppContextValue | null>(null);

const INITIAL_ACTIVITY_RINGS: ActivityRings = {
  move: 72,
  exercise: 55,
  stand: 40,
};

const INITIAL_HEART_RATE = 72;

export function AppProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(INITIAL_RECORDS);
  const [calendarSessions, setCalendarSessions] = useState<CalendarSession[]>(CALENDAR_OCTOBER_2024);
  const [activityRings, setActivityRings] = useState<ActivityRings>(INITIAL_ACTIVITY_RINGS);
  const [stepsCount, setStepsCount] = useState(12482);
  const [heartRate] = useState(INITIAL_HEART_RATE);

  const logActivity = (type: 'steps' | 'calories' | 'water') => {
    if (type === 'steps') {
      setStepsCount((prev) => prev + 1500);
      setActivityRings((prev) => ({
        ...prev,
        move: Math.min(100, prev.move + 8),
        exercise: Math.min(100, prev.exercise + 5),
      }));
    } else if (type === 'calories') {
      setActivityRings((prev) => ({
        ...prev,
        move: Math.min(100, prev.move + 6),
        exercise: Math.min(100, prev.exercise + 10),
      }));
    } else if (type === 'water') {
      alert('Water log successfully synced: +250ml logged to Apple Health!');
    }
  };

  const toggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id !== id) return dev;
        const nextStatus = dev.status === 'Synced' ? 'Disconnected' : 'Synced';
        return {
          ...dev,
          status: nextStatus,
          syncTimeText: nextStatus === 'Synced' ? 'Synced just now' : 'Disconnected',
          isActive: nextStatus === 'Synced',
        };
      })
    );
  };

  const addGoal = (goal: Goal) => {
    setGoals((prev) => [goal, ...prev]);
  };

  const addRecord = (record: PersonalRecord) => {
    setPersonalRecords((prev) => [record, ...prev]);
  };

  const goalIsStrengthOrSessions = (g: Goal) => {
    return g.title.toLowerCase().includes('strength') || g.category === 'SESSIONS';
  };

  const completeWorkout = (calories: number, minutes: number) => {
    setUserProfile((prev) => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      currentStreak: prev.currentStreak + 1,
    }));

    setActivityRings((prev) => ({
      move: Math.min(100, prev.move + 25),
      exercise: Math.min(100, prev.exercise + 35),
      stand: Math.min(100, prev.stand + 15),
    }));

    setStepsCount((prev) => prev + 2800);

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

    setGoals((prev) =>
      prev.map((g) => {
        if (!goalIsStrengthOrSessions(g)) return g;
        const nextVal = g.currentValue + 1;
        const nextPercent = Math.min(100, Math.round((nextVal / g.targetValue) * 100));
        return {
          ...g,
          currentValue: nextVal,
          progressPercent: nextPercent,
          deadlineText:
            nextVal >= g.targetValue
              ? 'Goal Reached!'
              : `${nextVal} of ${g.targetValue} workouts`,
        };
      })
    );
  };

  const state: AppState = {
    userProfile,
    goals,
    devices,
    personalRecords,
    calendarSessions,
    activityRings,
    stepsCount,
    heartRate,
  };

  const actions: AppActions = {
    logActivity,
    toggleDevice,
    addGoal,
    addRecord,
    completeWorkout,
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
