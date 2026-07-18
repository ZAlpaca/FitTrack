/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, Workout } from '../types';
import { calculateStrokeDashOffset } from '../utils';

interface DashboardTabProps {
  user: UserProfile;
  workouts: Workout[];
  onSelectWorkout: (id: string) => void;
  onLogActivity: (type: 'steps' | 'calories' | 'water') => void;
  moveValue: number;
  exerciseValue: number;
  standValue: number;
  stepsCount: number;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  user,
  workouts,
  onSelectWorkout,
  onLogActivity,
  moveValue,
  exerciseValue,
  standValue,
  stepsCount,
}) => {
  const [greeting, setGreeting] = useState('Good morning');
  const [pulseHr, setPulseHr] = useState(72);

  // Dynamic greeting based on current local time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 12 && hours < 17) {
      setGreeting('Good afternoon');
    } else if (hours >= 17 || hours < 5) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good morning');
    }
  }, []);

  // Simple heart rate pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseHr((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next > 90 ? 80 : next < 60 ? 65 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter 3 popular recent workouts
  const recentWorkouts = workouts.slice(0, 3);

  return (
    <div className="pb-32 pt-20 px-5 max-w-lg mx-auto text-[#e2e2e2]">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl flex justify-between items-center px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <img
              className="w-full h-full object-cover"
              src={user.avatarUrl}
              alt="Athlete Avatar"
            />
          </div>
          <div>
            <h1 className="text-[15px] font-medium text-white/60 tracking-wide">{greeting},</h1>
            <h2 className="text-lg font-bold text-white tracking-tight">Athlete Alex</h2>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform text-white">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </header>

      {/* Activity Rings Section */}
      <section className="flex flex-col items-center mt-6">
        <div className="relative w-64 h-64 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(204,255,0,0.15)]">
          {/* Inner Stand Ring - Radius 30 */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[0.62]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="9"
              strokeDasharray={2 * Math.PI * 30}
              strokeDashoffset={calculateStrokeDashOffset(standValue, 30)}
              strokeLinecap="round"
              className="opacity-100 transition-all duration-1000 ease-out"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="9"
              className="opacity-15"
            />
          </svg>

          {/* Middle Exercise Ring - Radius 37 */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[0.80]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="7"
              strokeDasharray={2 * Math.PI * 37}
              strokeDashoffset={calculateStrokeDashOffset(exerciseValue, 37)}
              strokeLinecap="round"
              className="opacity-100 transition-all duration-1000 ease-out"
            />
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="7"
              className="opacity-15"
            />
          </svg>

          {/* Outer Move Ring - Radius 44 */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#fa114f"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={calculateStrokeDashOffset(moveValue, 44)}
              strokeLinecap="round"
              className="opacity-100 transition-all duration-1000 ease-out"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#fa114f"
              strokeWidth="5"
              className="opacity-15"
            />
          </svg>

          {/* Central Lightning Bolt Indicator */}
          <div className="flex flex-col items-center justify-center z-10">
            <span className="material-symbols-outlined text-4xl text-brand-volt neon-glow material-symbols-fill animate-pulse">
              bolt
            </span>
          </div>
        </div>

        {/* Ring Legend (Styled with exact metric design) */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-red"></div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              Move ({moveValue}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-volt-dim"></div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              Exercise ({exerciseValue}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              Stand ({standValue}%)
            </span>
          </div>
        </div>
      </section>

      {/* Biometric Stats Bento Grid */}
      <section className="mt-8 grid grid-cols-2 gap-4">
        {/* Steps Card - Double height style with sparkline */}
        <div className="glass-card col-span-2 p-5 rounded-2xl flex justify-between items-end relative overflow-hidden group">
          <div className="z-10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1">
              DAILY STEPS
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {stepsCount.toLocaleString()}
            </h2>
            <p className="text-xs text-brand-volt-dim mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              12% from yesterday
            </p>
          </div>
          
          {/* Interactive sparkline simulator */}
          <div className="w-1/2 h-16 z-10 flex flex-col justify-end">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <path
                d="M 0,35 Q 20,30 40,38 T 80,10 T 100,5"
                fill="none"
                stroke="#CCFF00"
                strokeLinecap="round"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />
              <path
                className="opacity-15"
                d="M 0,35 Q 20,30 40,38 T 80,10 T 100,5 V 40 H 0 Z"
                fill="url(#sparkGrad)"
              />
              <defs>
                <linearGradient id="sparkGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <button 
              onClick={() => onLogActivity('steps')}
              className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 active:scale-90 transition-all text-xs flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Log
            </button>
          </div>
        </div>

        {/* Calories Card */}
        <div className="glass-card p-4 rounded-2xl relative flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-brand-red material-symbols-fill text-2xl mb-2 filter drop-shadow-[0_0_8px_rgba(250,17,79,0.3)]">
              local_fire_department
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1">
              Calories
            </p>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              842 <span className="text-xs font-normal text-white/50">kcal</span>
            </h3>
            <button
              onClick={() => onLogActivity('calories')}
              className="bg-white/10 hover:bg-white/20 rounded-full p-1 text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="glass-card p-4 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-brand-red material-symbols-fill text-2xl mb-2 animate-pulse filter drop-shadow-[0_0_8px_rgba(250,17,79,0.4)]">
              favorite
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1">
              Heart Rate
            </p>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-2 flex items-baseline gap-1">
            {pulseHr} <span className="text-xs font-normal text-white/50">bpm</span>
          </h3>
        </div>
      </section>

      {/* Recent Workouts Horizontal Scroll */}
      <section className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white tracking-tight">Recent Workouts</h2>
          <button className="text-xs font-bold text-brand-volt uppercase tracking-wider">
            VIEW ALL
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-3 -mx-5 px-5">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => onSelectWorkout(workout.id)}
              className="min-w-[280px] h-48 rounded-2xl relative overflow-hidden glass-card group flex flex-col justify-end p-5 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all duration-300"
            >
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  src={workout.imageUrl}
                  alt={workout.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <span className="px-2.5 py-1 rounded-md bg-brand-volt text-black font-extrabold text-[9px] uppercase tracking-wider mb-2 inline-block">
                  {workout.category}
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {workout.title}
                </h4>
                <div className="flex gap-4 mt-1 opacity-80 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {workout.durationMin}m
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    {workout.caloriesBurned} kcal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Tip Section */}
      <section className="mt-8 glass-card p-5 rounded-2xl border-l-4 border-brand-volt">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-brand-volt/15 rounded-full text-brand-volt">
            <span className="material-symbols-outlined">lightbulb</span>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-white">Daily Training Tip</h4>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Increasing your protein intake by 20% this week will significantly aid your muscle recovery after that heavy leg day. Keep hydrated with at least 3 liters of water.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
