/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppTab {
  DASHBOARD = 'dashboard',
  WORKOUTS = 'workouts',
  STATS = 'stats',
  PROFILE = 'profile',
}

export enum StatsSubview {
  OVERVIEW = 'overview',
  GOALS = 'goals',
  CALENDAR = 'calendar',
}

export interface UserProfile {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  totalWorkouts: number;
  currentStreak: number;
}

export interface Workout {
  id: string;
  title: string;
  category: 'Strength' | 'Cardio' | 'Recovery' | 'HIIT' | 'Yoga' | 'Cycling' | 'Mobility';
  durationMin: number;
  caloriesBurned: number;
  intensity: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE' | 'CALM';
  imageUrl: string;
  description: string;
  exercises: ExerciseStep[];
  isFavorite?: boolean;
}

export interface ExerciseStep {
  name: string;
  type: string;
  durationText: string;
  imageUrl: string;
}

export interface Goal {
  id: string;
  category: 'CURRENT FOCUS' | 'WEEKLY TARGET' | 'SESSIONS';
  title: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progressPercent: number;
  deadlineText: string;
  icon: string;
}

export interface Device {
  id: string;
  name: string;
  icon: string;
  status: 'Synced' | 'Disconnected';
  syncTimeText: string;
  isActive: boolean;
}

export interface PersonalRecord {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface CalendarSession {
  dayNum: number;
  isCompleted: boolean;
  isActiveSelection?: boolean;
  title?: string;
  durationMin?: number;
  caloriesBurned?: number;
  avgHr?: number;
  effortRating?: number;
}
